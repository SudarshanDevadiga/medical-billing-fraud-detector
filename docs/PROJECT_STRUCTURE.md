# 📁 Project Structure

## Simple Medical Fraud Detector

---

## Essential Files (Core Project)

```
simple-fraud-detector/
├── backend/                    # Backend code
│   ├── server.js              # Main Express server (250 lines)
│   ├── PriorityQueue.js       # Min Heap implementation (70 lines)
│   ├── HashTable.js           # Hash Table implementation (45 lines)
│   ├── BST.js                 # Binary Search Tree (55 lines)
│   ├── Graph.js               # Graph with BFS/DFS (70 lines)
│   └── seed.js                # Sample data generator (80 lines)
│
├── frontend/                   # Frontend code
│   └── index.html             # Single-page dashboard (350 lines)
│
├── package.json               # Dependencies
├── .env                       # Configuration
└── README.md                  # Main documentation
```

**Total Essential Files:** 10 files (~920 lines)

---

## Documentation (Non-Essential)

```
simple-fraud-detector/
└── docs/                      # Additional documentation
    ├── QUICKSTART.md          # Quick start guide
    └── FEATURES_DEMO.md       # Feature demonstration guide
```

---

## What Each File Does

### **Essential Files:**

**backend/server.js**
- Express server setup
- 10 API endpoints
- MongoDB connection
- Data structure initialization

**backend/PriorityQueue.js**
- Min Heap implementation
- Used for lead qualification
- O(log n) operations

**backend/HashTable.js**
- Hash table implementation
- Used for duplicate detection
- O(1) lookup

**backend/BST.js**
- Binary Search Tree
- Used for product search by price
- O(log n) search

**backend/Graph.js**
- Graph with adjacency list
- BFS and DFS algorithms
- Used for referral network

**backend/seed.js**
- Creates sample data
- 3 leads, 2 customers, 4 orders, 4 products, 3 claims

**frontend/index.html**
- Single-page dashboard
- All features in one page
- Interactive forms and tables
- Charts using Chart.js

**package.json**
- Dependencies: express, mongodb, cors
- Scripts: start, seed

**.env**
- MongoDB URI
- Port configuration

**README.md**
- Project overview
- Features list
- Setup instructions

### **Documentation Files:**

**docs/QUICKSTART.md**
- 3-step setup guide
- Troubleshooting tips
- Quick reference

**docs/FEATURES_DEMO.md**
- Feature-by-feature demo guide
- Test scenarios
- Expected results

---

## File Size Breakdown

| File | Lines | Purpose |
|------|-------|---------|
| server.js | 250 | Main backend |
| index.html | 350 | Main frontend |
| PriorityQueue.js | 70 | DSA implementation |
| Graph.js | 70 | DSA implementation |
| seed.js | 80 | Data generation |
| BST.js | 55 | DSA implementation |
| HashTable.js | 45 | DSA implementation |
| README.md | 100 | Documentation |

**Total:** ~920 lines (vs 5,000+ in full version)

---

## To Run the Project

**You only need these commands:**
```bash
npm install    # Install dependencies
npm run seed   # Create sample data
npm start      # Start server
```

**Then visit:** http://localhost:3002

---

## Clean and Simple! ✨

All essential code in 10 files, documentation in `docs/` folder.
