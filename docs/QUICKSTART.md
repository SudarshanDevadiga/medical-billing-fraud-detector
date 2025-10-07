# 🚀 Quick Start Guide

## Simple Medical Fraud Detector

---

## ⚡ 3-Step Setup

### **Step 1: Install**
```bash
cd simple-fraud-detector
npm install
```

### **Step 2: Seed Data**
```bash
npm run seed
```

### **Step 3: Start**
```bash
npm start
```

### **Step 4: Open Browser**
```
http://localhost:3002
```

---

## 📊 What You'll See

### **Dashboard Shows:**
- ✅ 3 leads in priority queue
- ✅ 3 medical claims with fraud scores
- ✅ 2 customers for RFM analysis
- ✅ 4 orders for channel performance
- ✅ Interactive forms to add more data

---

## 🎯 Features to Demo

### **1. Lead Qualification (Priority Queue + Hash Table)**
- Submit a new lead
- See it automatically prioritized
- Try submitting duplicate email → Hash Table detects it!

### **2. Fraud Detection**
- Submit a medical claim
- See automatic fraud score calculation
- High amounts get higher fraud scores

### **3. Business Metrics (MongoDB Aggregation)**
- Click "Calculate RFM" → See customer segments
- Click "Calculate CLV" → See lifetime value
- Click "Calculate NPS" → See satisfaction score

### **4. Operations (Graph + Channels)**
- Click "Load Channel Performance" → See sales by channel
- Click "Analyze Referral Network" → See Graph BFS/DFS

---

## 📁 Project Structure

```
simple-fraud-detector/
├── backend/
│   ├── server.js          # Main server (200 lines)
│   ├── PriorityQueue.js   # Min Heap (70 lines)
│   ├── HashTable.js       # Hash Table (45 lines)
│   ├── BST.js             # Binary Search Tree (55 lines)
│   ├── Graph.js           # Graph with BFS/DFS (70 lines)
│   └── seed.js            # Sample data (80 lines)
├── frontend/
│   └── index.html         # Single-page dashboard (280 lines)
├── package.json
├── README.md
└── QUICKSTART.md
```

**Total:** ~800 lines (10x simpler than full project!)

---

## 🎓 Exam Requirements Coverage

### ✅ **Data Structures & Algorithms II**
- Priority Queue (Min Heap) - O(log n)
- Hash Table - O(1) lookup
- BST - O(log n) search
- Graph (BFS/DFS) - O(V + E)
- Sliding Window - O(n)

### ✅ **NoSQL Databases**
- MongoDB collections
- Aggregation pipelines (RFM, CLV, NPS)
- Indexes for performance
- CRUD operations
- Document-based storage

### ✅ **Business 2**
- Customer acquisition funnel
- Lead qualification
- RFM segmentation
- Customer lifetime value
- Net Promoter Score
- Channel performance
- Referral network

---

## 🔧 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3002
lsof -ti:3002 | xargs kill -9
npm start
```

**MongoDB not running?**
```bash
brew services start mongodb-community
```

**Need fresh data?**
```bash
npm run seed
```

---

## 📸 For Your Report

**Take screenshots of:**
1. Priority queue with leads
2. Fraud detection results
3. RFM segmentation table
4. Channel performance
5. Fraud score chart

---

## ✅ You're Ready!

**Simple version is perfect for:**
- Quick understanding
- Fast demos
- Learning core concepts
- Time-constrained situations

**Still passes all exam requirements!** 🎉
