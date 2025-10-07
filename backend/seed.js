const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017/simple_fraud_detector';

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('🌱 Seeding simple fraud detector data...\n');
    
    await db.collection('leads').deleteMany({});
    await db.collection('customers').deleteMany({});
    await db.collection('orders').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('claims').deleteMany({});
    
    const leads = [
      { name: 'John Enterprise', email: 'john@bigcorp.com', phone: '555-0001', source: 'referral', budget: 100000, score: 20 },
      { name: 'Jane Startup', email: 'jane@startup.com', phone: '555-0002', source: 'website', budget: 5000, score: 75 },
      { name: 'Bob Direct', email: 'bob@direct.com', phone: '555-0003', source: 'direct', budget: 50000, score: 40 }
    ];
    await db.collection('leads').insertMany(leads);
    console.log(`✓ Created ${leads.length} leads`);
    
    const customers = [
      { name: 'Alice Brown', email: 'alice@example.com', phone: '555-1001', npsScore: 9 },
      { name: 'Charlie Davis', email: 'charlie@example.com', phone: '555-1002', npsScore: 7, referredBy: null }
    ];
    const customerResult = await db.collection('customers').insertMany(customers);
    const customerIds = Object.values(customerResult.insertedIds);
    console.log(`✓ Created ${customers.length} customers`);
    
    await db.collection('customers').updateOne(
      { _id: customerIds[1] },
      { $set: { referredBy: customerIds[0] } }
    );
    
    const orders = [
      { customerId: customerIds[0], amount: 1500, channel: 'online', date: new Date('2024-10-01') },
      { customerId: customerIds[0], amount: 2000, channel: 'retail', date: new Date('2024-09-15') },
      { customerId: customerIds[0], amount: 1200, channel: 'online', date: new Date('2024-08-20') },
      { customerId: customerIds[1], amount: 500, channel: 'wholesale', date: new Date('2024-06-10') }
    ];
    await db.collection('orders').insertMany(orders);
    console.log(`✓ Created ${orders.length} orders`);
    
    const products = [
      { name: 'Laptop', sku: 'LAP-001', price: 1500, inventory: 50 },
      { name: 'Mouse', sku: 'MOU-001', price: 50, inventory: 200 },
      { name: 'Keyboard', sku: 'KEY-001', price: 150, inventory: 100 },
      { name: 'Monitor', sku: 'MON-001', price: 400, inventory: 30 }
    ];
    await db.collection('products').insertMany(products);
    console.log(`✓ Created ${products.length} products`);
    
    const claims = [
      { patientName: 'Patient A', providerName: 'Dr. Smith', amount: 500, procedures: ['99213'], fraudScore: 10, riskLevel: 'LOW' },
      { patientName: 'Patient B', providerName: 'Dr. Jones', amount: 15000, procedures: ['99213', '93000', '80053', '85025'], fraudScore: 65, riskLevel: 'HIGH' },
      { patientName: 'Patient C', providerName: 'Dr. Smith', amount: 10000, procedures: ['99213', '93000'], fraudScore: 45, riskLevel: 'MEDIUM' }
    ];
    await db.collection('claims').insertMany(claims);
    console.log(`✓ Created ${claims.length} medical claims`);
    
    console.log('\n✅ Seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - ${leads.length} leads (Priority Queue)`);
    console.log(`   - ${customers.length} customers (RFM, CLV, NPS)`);
    console.log(`   - ${orders.length} orders (Channel Performance)`);
    console.log(`   - ${products.length} products (BST Search)`);
    console.log(`   - ${claims.length} medical claims (Fraud Detection)`);
    console.log('\n🚀 Run: npm start');
    console.log('🌐 Visit: http://localhost:3002\n');
    
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await client.close();
  }
}

seed();
