# Medical Fraud Detector

A comprehensive fraud detection and customer relationship management system built with Data Structures & Algorithms, Node.js, Express, and MongoDB.

## Features

### 1. Lead Capture & Qualification
- **Priority Queue**: Automatically prioritizes leads by budget amount
- **Hash Table**: Duplicate email detection (O(1) lookup)
- Track lead pipeline stages: Prospect → Contacted → Qualified → Converted

### 2. Medical Fraud Detection
- Analyzes medical claims for fraud indicators
- Calculates fraud scores based on:
  - Claim amount
  - Number of procedures
  - Suspicious patterns
- Risk levels: LOW, MEDIUM, HIGH

### 3. Business Metrics Dashboard
- **RFM Analysis**: Segment customers by Recency, Frequency, Monetary value
- **CLV (Customer Lifetime Value)**: Predict customer revenue potential
- **NPS (Net Promoter Score)**: Measure customer satisfaction

### 4. Operations & Referral Network
- **Graph (BFS/DFS)**: Analyze referral networks and identify top referrers
- **Channel Performance**: Track revenue by sales channel
- **Binary Search Tree**: Efficient product search by price range

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Charts**: Chart.js

## Data Structures & Algorithms

| Data Structure | Use Case | Time Complexity |
|----------------|----------|-----------------|
| Priority Queue (Min Heap) | Lead qualification | O(log n) insert/delete |
| Hash Table | Duplicate detection | O(1) average |
| Binary Search Tree | Product search | O(log n) search |
| Graph (Adjacency List) | Referral network | O(V + E) BFS/DFS |
| Sliding Window | Activity metrics | O(n) |

## Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd fraud-detector
```

2. **Install dependencies**
```bash
npm install
```

3. **Start MongoDB**
```bash
mongod
```

4. **Seed the database** (optional)
```bash
npm run seed
```

5. **Start the server**
```bash
npm start
```

6. **Open in browser**
```
http://localhost:3002
```

## Project Structure

```
fraud-detector/
├── backend/
│   ├── BST.js              # Binary Search Tree implementation
│   ├── Graph.js            # Graph with BFS/DFS algorithms
│   ├── HashTable.js        # Hash Table for duplicate detection
│   ├── PriorityQueue.js    # Min Heap implementation
│   ├── server.js           # Express server & API routes
│   └── seed.js             # Database seeding script
├── frontend/
│   └── index.html          # Single-page application
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Create new lead |
| GET | `/api/leads` | Get all leads (sorted by priority) |
| POST | `/api/claims` | Submit medical claim for fraud analysis |
| GET | `/api/claims` | Get all claims (sorted by fraud score) |
| POST | `/api/rfm` | Calculate RFM segmentation |
| POST | `/api/clv` | Calculate Customer Lifetime Value |
| POST | `/api/nps` | Calculate Net Promoter Score |
| GET | `/api/referrals` | Get top referrers |
| GET | `/api/channels` | Get channel performance |
| GET | `/api/dashboard` | Get dashboard statistics |

## Usage Examples

### Add a Lead
```javascript
POST /api/leads
{
  "name": "John Doe",
  "email": "john@example.com",
  "budget": 50000,
  "source": "referral"
}
```

### Submit Medical Claim
```javascript
POST /api/claims
{
  "patientName": "Patient A",
  "providerName": "Dr. Smith",
  "amount": 15000,
  "procedures": ["99213", "93000", "80053"]
}
```

## License

MIT
