const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const PriorityQueue = require('./PriorityQueue');
const HashTable = require('./HashTable');
const BST = require('./BST');
const Graph = require('./Graph');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let db = null;
const MONGODB_URI = 'mongodb://localhost:27017/simple_fraud_detector';

async function connectDB() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db();
  
  await db.collection('leads').createIndex({ email: 1 }, { unique: true });
  await db.collection('customers').createIndex({ email: 1 }, { unique: true });
  await db.collection('claims').createIndex({ fraudScore: -1 });
  
  console.log('✓ Connected to MongoDB');
}

const leadQueue = new PriorityQueue();
const duplicateDetector = new HashTable();
const productTree = new BST();
const referralGraph = new Graph();

function calculateLeadScore(lead) {
  let score = 100;
  if (lead.budget >= 50000) score -= 30;
  else if (lead.budget >= 10000) score -= 20;
  if (lead.source === 'referral') score -= 25;
  else if (lead.source === 'direct') score -= 15;
  return Math.max(1, score);
}

function calculateFraudScore(claim) {
  let score = 0;
  
  if (claim.amount > 10000) score += 30;
  else if (claim.amount > 5000) score += 20;
  
  if (claim.amount % 1000 === 0) score += 15;
  
  if (claim.procedures && claim.procedures.length > 3) score += 20;
  
  return Math.min(100, score);
}

function calculateMovingAverage(data, windowSize = 7) {
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const avg = window.reduce((sum, val) => sum + val, 0) / window.length;
    results.push(avg);
  }
  return results;
}

app.post('/api/leads', async (req, res) => {
  try {
    const lead = req.body;
    
    if (duplicateDetector.has(lead.email)) {
      return res.json({ success: false, message: 'Duplicate email detected!' });
    }
    
    const score = calculateLeadScore(lead);
    lead.score = score;
    lead.stage = 'prospect';
    lead.createdAt = new Date();
    
    const result = await db.collection('leads').insertOne(lead);
    lead._id = result.insertedId;
    
    leadQueue.enqueue(lead, score);
    duplicateDetector.set(lead.email, lead._id.toString());
    
    res.json({ success: true, lead, score, message: 'Lead added to priority queue!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/leads', (req, res) => {
  const leads = leadQueue.getAll();
  res.json({ success: true, count: leads.length, leads });
});

app.patch('/api/leads/:id/stage', async (req, res) => {
  try {
    const { stage } = req.body;
    await db.collection('leads').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { stage, updatedAt: new Date() } }
    );
    res.json({ success: true, message: `Lead moved to ${stage}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/claims', async (req, res) => {
  try {
    const claim = req.body;
    
    const fraudScore = calculateFraudScore(claim);
    claim.fraudScore = fraudScore;
    claim.riskLevel = fraudScore >= 50 ? 'HIGH' : fraudScore >= 30 ? 'MEDIUM' : 'LOW';
    claim.submittedAt = new Date();
    
    const result = await db.collection('claims').insertOne(claim);
    claim._id = result.insertedId;
    
    res.json({ success: true, claim, fraudScore, riskLevel: claim.riskLevel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/claims', async (req, res) => {
  try {
    const claims = await db.collection('claims')
      .find({})
      .sort({ fraudScore: -1 })
      .toArray();
    res.json({ success: true, count: claims.length, claims });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/rfm', async (req, res) => {
  try {
    const customers = await db.collection('customers').aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'customerId',
          as: 'orders'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalOrders: { $size: '$orders' },
          totalSpent: { $sum: '$orders.amount' },
          lastOrder: { $max: '$orders.date' }
        }
      },
      {
        $addFields: {
          daysSince: {
            $divide: [{ $subtract: [new Date(), '$lastOrder'] }, 1000 * 60 * 60 * 24]
          }
        }
      },
      {
        $addFields: {
          recencyScore: {
            $cond: {
              if: { $lte: ['$daysSince', 30] },
              then: 5,
              else: { $cond: { if: { $lte: ['$daysSince', 90] }, then: 3, else: 1 } }
            }
          },
          frequencyScore: {
            $cond: {
              if: { $gte: ['$totalOrders', 10] },
              then: 5,
              else: { $cond: { if: { $gte: ['$totalOrders', 5] }, then: 3, else: 1 } }
            }
          },
          monetaryScore: {
            $cond: {
              if: { $gte: ['$totalSpent', 5000] },
              then: 5,
              else: { $cond: { if: { $gte: ['$totalSpent', 1000] }, then: 3, else: 1 } }
            }
          }
        }
      },
      {
        $addFields: {
          rfmTotal: { $add: ['$recencyScore', '$frequencyScore', '$monetaryScore'] },
          segment: {
            $cond: {
              if: { $gte: ['$rfmTotal', 13] },
              then: 'Champions',
              else: {
                $cond: {
                  if: { $gte: ['$rfmTotal', 9] },
                  then: 'Loyal',
                  else: {
                    $cond: {
                      if: { $gte: ['$rfmTotal', 5] },
                      then: 'At Risk',
                      else: 'Lost'
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]).toArray();
    
    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/clv', async (req, res) => {
  try {
    const customers = await db.collection('customers').aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'customerId',
          as: 'orders'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalOrders: { $size: '$orders' },
          totalSpent: { $sum: '$orders.amount' },
          avgOrderValue: { $avg: '$orders.amount' },
          firstOrder: { $min: '$orders.date' }
        }
      },
      {
        $addFields: {
          lifespanMonths: {
            $divide: [
              { $subtract: [new Date(), '$firstOrder'] },
              1000 * 60 * 60 * 24 * 30
            ]
          }
        }
      },
      {
        $addFields: {
          purchaseFrequency: {
            $cond: [
              { $gt: ['$lifespanMonths', 0] },
              { $divide: ['$totalOrders', '$lifespanMonths'] },
              0
            ]
          }
        }
      },
      {
        $addFields: {
          clv: { $multiply: ['$avgOrderValue', '$purchaseFrequency', 36] }
        }
      }
    ]).toArray();
    
    const avgCLV = customers.reduce((sum, c) => sum + (c.clv || 0), 0) / customers.length;
    
    res.json({ success: true, customers, avgCLV });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/nps', async (req, res) => {
  try {
    const customers = await db.collection('customers')
      .find({ npsScore: { $ne: null } })
      .toArray();
    
    let promoters = 0, passives = 0, detractors = 0;
    
    customers.forEach(c => {
      if (c.npsScore >= 9) promoters++;
      else if (c.npsScore >= 7) passives++;
      else detractors++;
    });
    
    const total = customers.length;
    const nps = ((promoters / total) * 100) - ((detractors / total) * 100);
    
    res.json({
      success: true,
      nps: nps.toFixed(1),
      promoters,
      passives,
      detractors
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/referrals', async (req, res) => {
  try {
    const customers = await db.collection('customers').find({}).toArray();
    
    referralGraph.adjacencyList.clear();
    for (const customer of customers) {
      referralGraph.addVertex(customer._id.toString());
      if (customer.referredBy) {
        referralGraph.addEdge(customer.referredBy.toString(), customer._id.toString());
      }
    }
    
    const topReferrers = referralGraph.getTopReferrers(5);
    
    res.json({ success: true, topReferrers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/channels', async (req, res) => {
  try {
    const channels = await db.collection('orders').aggregate([
      {
        $group: {
          _id: '$channel',
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$amount' },
          avgOrderValue: { $avg: '$amount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]).toArray();
    
    res.json({ success: true, channels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/search', (req, res) => {
  const { min, max } = req.query;
  const results = productTree.rangeSearch(parseFloat(min) || 0, parseFloat(max) || 10000);
  res.json({ success: true, products: results });
});

app.get('/api/metrics/activity', async (req, res) => {
  try {
    const orders = await db.collection('orders')
      .find({})
      .sort({ date: 1 })
      .toArray();
    
    const amounts = orders.map(o => o.amount);
    const movingAvg = calculateMovingAverage(amounts, 7);
    
    res.json({ success: true, movingAverage: movingAvg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const [leads, claims, customers, orders] = await Promise.all([
      db.collection('leads').countDocuments(),
      db.collection('claims').countDocuments(),
      db.collection('customers').countDocuments(),
      db.collection('orders').countDocuments()
    ]);
    
    const highRiskClaims = await db.collection('claims')
      .find({ riskLevel: 'HIGH' })
      .toArray();
    
    const avgFraudScore = await db.collection('claims').aggregate([
      { $group: { _id: null, avg: { $avg: '$fraudScore' } } }
    ]).toArray();
    
    res.json({
      success: true,
      stats: {
        totalLeads: leads,
        totalClaims: claims,
        totalCustomers: customers,
        totalOrders: orders,
        highRiskClaims: highRiskClaims.length,
        avgFraudScore: avgFraudScore[0]?.avg || 0,
        queueSize: leadQueue.size()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', leads: leadQueue.size() });
});

async function start() {
  try {
    await connectDB();
    
    const leads = await db.collection('leads').find({}).toArray();
    for (const lead of leads) {
      leadQueue.enqueue(lead, lead.score);
      duplicateDetector.set(lead.email, lead._id.toString());
    }
    console.log(`✓ Loaded ${leads.length} leads into priority queue`);
    
    const products = await db.collection('products').find({}).toArray();
    for (const product of products) {
      productTree.insert(product.price, product);
    }
    console.log(`✓ Loaded ${products.length} products into BST`);
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Simple Fraud Detector running on http://localhost:${PORT}\n`);
      console.log('📊 Features:');
      console.log('   ✓ Priority Queue - Lead qualification');
      console.log('   ✓ Hash Table - Duplicate detection');
      console.log('   ✓ BST - Product search');
      console.log('   ✓ Graph (BFS/DFS) - Referral network');
      console.log('   ✓ Sliding Window - Activity metrics');
      console.log('   ✓ MongoDB Aggregation - RFM, CLV, NPS\n');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
