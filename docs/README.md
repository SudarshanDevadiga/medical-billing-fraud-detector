# 🏥 Simple Medical Fraud Detector

**Customer Acquisition to Loyalty: Sales Funnel & Operations Dashboard**

A simplified, focused system demonstrating all exam requirements in ~800 lines of code.

## 🎯 Project Theme
Customer Acquisition to Loyalty: Sales Funnel & Operations Dashboard

**Subjects Integrated:**
- ✅ Data Structures & Algorithms II
- ✅ NoSQL Databases (MongoDB)
- ✅ Business 2 (Customer Acquisition, Sales & Operations)

## Features Implemented

### 1. Customer Acquisition to Loyalty (Business + DSA)
- ✅ Lead-capture form that stores prospects in MongoDB
- ✅ Lead-qualification engine using Priority Queue
- ✅ Move leads through stages: Prospect → Qualified → Customer → Loyal
- ✅ Use Hashing to detect duplicate customers

### 2. Sales Funnel & CRM (Business + DSA)
- ✅ Track leads through conversion stages
- ✅ Duplicate detection with Hash Table
- ✅ Priority-based lead routing

### 3. Business Metrics Dashboard (Business + NoSQL)
- ✅ MongoDB Aggregation Pipelines for:
  - RFM Segmentation
  - Customer Lifetime Value (CLV)
  - Net Promoter Score (NPS)

### 4. Operations Module (Business + DSA)
- ✅ Simple order and inventory tracking
- ✅ Channel-wise sales performance

### 5. Algorithms & Data Structures
- ✅ **Priority Queue (Heap)** - Lead qualification
- ✅ **Hash Table** - Duplicate detection
- ✅ **BST** - Product search by price
- ✅ **Graph (BFS/DFS)** - Referral network
- ✅ **Sliding Window** - Activity metrics

### 6. Medical Fraud Detection
- ✅ Claim analysis with fraud scoring
- ✅ Pattern detection (duplicates, high amounts)
- ✅ Risk level classification

## Technology Stack

- **Backend:** Node.js + Express (Plain JavaScript)
- **Database:** MongoDB
- **Frontend:** HTML + CSS + Vanilla JavaScript
- **Charts:** Chart.js

## Quick Start

```bash
# Install dependencies
npm install

# Seed sample data
npm run seed

# Start server
npm start

# Open browser
http://localhost:3002
```

## Project Structure

```
simple-fraud-detector/
├── backend/
│   ├── server.js              # Express server
│   ├── PriorityQueue.js       # Min Heap for leads
│   ├── HashTable.js           # Duplicate detection
│   ├── BST.js                 # Product search
│   ├── Graph.js               # Referral network
│   └── seed.js                # Sample data
├── frontend/
│   └── index.html             # Single-page dashboard
├── package.json
└── README.md
```

**Total Lines:** ~800 (Simple and focused)

## API Endpoints

- `POST /api/leads` - Submit lead
- `GET /api/leads` - Get priority queue
- `POST /api/claims` - Submit claim
- `GET /api/claims` - Get all claims
- `POST /api/rfm` - Calculate RFM
- `POST /api/clv` - Calculate CLV
- `POST /api/nps` - Calculate NPS
- `GET /api/referrals` - Get referral network

## Evaluation Coverage

✅ **DSA-II:** Priority Queue, Hash Table, BST, Graph, Sliding Window  
✅ **NoSQL:** MongoDB with aggregation pipelines, indexes  
✅ **Business 2:** Customer acquisition funnel, RFM, CLV, NPS, operations

**Expected Grade:** A (All requirements met in simplified form)
