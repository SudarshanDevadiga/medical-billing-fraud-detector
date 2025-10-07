# 🎬 Features Demo Guide

## Simple Medical Fraud Detector

**URL:** http://localhost:3002

---

## 🎯 What You'll See on the Dashboard

### **Top Section: Statistics Cards**
```
┌─────────────────────────────────────────────────┐
│  📋 Total Leads: 3                              │
│  🏥 Medical Claims: 3                           │
│  👥 Customers: 2                                │
│  ⚠️ High Risk Claims: 1                         │
└─────────────────────────────────────────────────┘
```

---

## 📋 Feature 1: Lead Capture & Qualification

### **What It Demonstrates:**
- ✅ **Priority Queue (Min Heap)** - O(log n) insertion
- ✅ **Hash Table** - O(1) duplicate detection

### **How to Test:**

**1. Submit a New Lead:**
- Fill in: Name, Email, Budget, Source
- Click "Submit Lead"
- See it appear in priority queue below

**2. Test Duplicate Detection:**
- Try submitting same email again
- Hash Table detects it instantly!
- Shows error: "Duplicate email detected!"

**3. View Priority Queue:**
- Leads sorted by priority score
- Lower score = Higher priority
- High budget + Referral source = Top priority

### **Priority Scoring:**
```
Budget:
├─ $50,000+ → -30 points (High priority)
├─ $10,000+ → -20 points
└─ <$10,000 → No bonus

Source:
├─ Referral → -25 points (Highest)
├─ Direct → -15 points
└─ Website → -10 points

Lower score = Higher priority!
```

---

## 🏥 Feature 2: Medical Fraud Detection

### **What It Demonstrates:**
- ✅ Pattern analysis
- ✅ Risk scoring algorithm
- ✅ MongoDB storage and retrieval

### **How to Test:**

**1. Submit a Low-Risk Claim:**
```
Patient: John Doe
Provider: Dr. Smith
Amount: $500
Procedures: 99213
→ Fraud Score: ~10 (LOW)
```

**2. Submit a High-Risk Claim:**
```
Patient: Jane Doe
Provider: Dr. Jones
Amount: $15,000
Procedures: 99213, 93000, 80053, 85025
→ Fraud Score: ~65 (HIGH)
```

**3. View Claims Table:**
- Sorted by fraud score (highest first)
- Color-coded risk levels
- RED = High, YELLOW = Medium, GREEN = Low

### **Fraud Scoring Logic:**
```
Amount:
├─ >$10,000 → +30 points
├─ >$5,000 → +20 points
└─ <$5,000 → No penalty

Round Numbers:
└─ Divisible by 1000 → +15 points (suspicious)

Multiple Procedures:
└─ >3 procedures → +20 points

Max Score: 100
```

---

## 📊 Feature 3: Business Metrics

### **What It Demonstrates:**
- ✅ **MongoDB Aggregation Pipelines**
- ✅ RFM Segmentation
- ✅ Customer Lifetime Value (CLV)
- ✅ Net Promoter Score (NPS)

### **How to Test:**

**1. Calculate RFM Segmentation:**
- Click "Calculate RFM" button
- See customers segmented:
  - **Champions** (RFM 13-15): Best customers
  - **Loyal** (RFM 9-12): Regular customers
  - **At Risk** (RFM 5-8): Declining engagement
  - **Lost** (RFM 3-4): Inactive customers

**2. Calculate CLV:**
- Click "Calculate CLV" button
- See predicted lifetime value for each customer
- Formula: Avg Order × Frequency × 36 months

**3. Calculate NPS:**
- Click "Calculate NPS" button
- See satisfaction score (-100 to +100)
- Breakdown: Promoters, Passives, Detractors

---

## 📦 Feature 4: Operations & Referral Network

### **What It Demonstrates:**
- ✅ **Graph with BFS/DFS** - Referral analysis
- ✅ Channel performance tracking
- ✅ BST for product search

### **How to Test:**

**1. Load Channel Performance:**
- Click "Load Channel Performance"
- See sales by channel:
  - Online
  - Retail
  - Wholesale
- Shows: Orders, Revenue, Avg Order Value

**2. Analyze Referral Network:**
- Click "Analyze Referral Network"
- See top referrers (Graph analysis)
- Uses BFS/DFS algorithms

---

## 📈 Charts at Bottom

### **Fraud Score Distribution:**
- Bar chart showing fraud scores for all claims
- Color-coded: Red (High), Yellow (Medium), Green (Low)

### **Sales Funnel:**
- Bar chart showing conversion stages
- Prospect → Qualified → Customer → Loyal

---

## 🎓 Data Structures in Action

### **Where Each is Used:**

**1. Priority Queue (Min Heap):**
- Location: Lead Capture section
- Action: Submit a lead
- Result: Automatically prioritized in queue

**2. Hash Table:**
- Location: Lead Capture section
- Action: Submit duplicate email
- Result: Instant detection

**3. BST:**
- Location: Backend (product search)
- API: `/api/products/search?min=100&max=500`
- Result: Fast price range queries

**4. Graph (BFS/DFS):**
- Location: Operations section
- Action: Click "Analyze Referral Network"
- Result: Shows referral chains

**5. Sliding Window:**
- Location: Backend (activity metrics)
- API: `/api/metrics/activity`
- Result: Moving averages

---

## 🧪 Test Scenarios

### **Scenario 1: High-Priority Lead**
```
Name: Enterprise Client
Email: enterprise@bigcorp.com
Budget: $100,000
Source: Referral
→ Priority Score: 20 (Highest!)
```

### **Scenario 2: Low-Priority Lead**
```
Name: Small Business
Email: small@shop.com
Budget: $2,000
Source: Website
→ Priority Score: 85 (Lowest)
```

### **Scenario 3: Duplicate Detection**
```
Submit same email twice
→ Hash Table catches it!
→ Error message shown
```

### **Scenario 4: High-Risk Fraud**
```
Amount: $20,000 (round number)
Procedures: 5+ procedures
→ Fraud Score: 80+ (HIGH RISK)
```

---

## 📊 MongoDB Aggregation Example

**RFM Pipeline:**
```javascript
1. $lookup → Join orders with customers
2. $project → Calculate totals
3. $addFields → Calculate days since last order
4. $addFields → Assign R, F, M scores (1-5)
5. $addFields → Calculate total RFM score
6. $addFields → Assign segment (Champions, Loyal, etc.)
```

**Result:** Customers automatically segmented!

---

## ✅ All Exam Requirements Met

### **DSA-II:**
- ✅ Priority Queue (Heap)
- ✅ Hash Table
- ✅ BST
- ✅ Graph (BFS/DFS)
- ✅ Sliding Window

### **NoSQL:**
- ✅ MongoDB collections
- ✅ Aggregation pipelines
- ✅ Indexes
- ✅ CRUD operations

### **Business 2:**
- ✅ Customer acquisition
- ✅ Lead qualification
- ✅ RFM Segmentation
- ✅ CLV calculation
- ✅ NPS tracking
- ✅ Channel performance
- ✅ Referral network

---

## 🎊 You're Ready!

**Refresh your browser:** http://localhost:3002

**You should see:**
- Purple gradient background
- 4 stat cards at top
- Lead submission form
- Priority queue table
- Claim submission form
- Claims table with fraud scores
- Business metrics buttons
- Operations buttons
- 2 charts at bottom

**Everything is working!** 🚀
