document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const data = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [{
      label: "Annual Revenue (₹ Crore)",
      backgroundColor: "#174887",
      data: [633.43, 823.15, 1071.91, 1392.89, 1811.88]
    }]
  };
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Revenue (₹ Crore)"
          }
        }
      }
    }
  });
});
// Currency conversion rate
const USD_TO_INR = 88.8;

// Helper to format numbers as INR currency strings
function formatINR(amount) {
  return "₹ " + amount.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

// Data extracted and converted from CSVs (abbreviated for brevity)
const financialMetrics = [
  { metric: "Customer Acquisition Cost (CAC)", year1: 2500, year2: 2200, year3: 2000 },
  { metric: "Customer Lifetime Value (CLV)", year1: 36000, year2: 42000, year3: 48000 },
  { metric: "Monthly Recurring Revenue (MRR)", year1: 595000, year2: 773500, year3: 1005550 },
  { metric: "Annual Recurring Revenue (ARR)", year1: 7140000, year2: 9282000, year3: 12066600 },
  { metric: "Churn Rate (Monthly)", year1: "2.5%", year2: "2.0%", year3: "1.8%" },
  { metric: "Average Revenue Per User (ARPU)", year1: 850, year2: 950, year3: 1100 },
  { metric: "Conversion Rate (Trial to Paid)", year1: "15%", year2: "18%", year3: "20%" },
  { metric: "Sales Cycle Length", year1: "90 days", year2: "75 days", year3: "60 days" }
];

const pricingStrategy = [
  { tier: "Basic Plan", target: "Small practices (1-10 providers)", priceUSD: 299, features: "Basic fraud detection, 1000 claims/month" },
  { tier: "Professional Plan", target: "Medium practices (11-50 providers)", priceUSD: 899, features: "Advanced analytics, 10,000 claims/month" },
  { tier: "Enterprise Plan", target: "Large hospitals (51+ providers)", priceUSD: 2499, features: "Enterprise features, unlimited claims" },
  { tier: "Per-Claim Processing", target: "High-volume processors", priceUSD: "Per transaction", features: "$0.05-0.15 per claim processed" },
  { tier: "Premium Analytics Add-on", target: "Data-driven organizations", priceUSD: 499, features: "Custom dashboards, predictive analytics" },
  { tier: "API Access", target: "Third-party developers", priceUSD: 199, features: "RESTful API, 10,000 calls/month" },
  { tier: "Consulting Services", target: "Complex implementations", priceUSD: "Hourly rate", features: "Custom integration, training, support" }
];

const revenueStreams = [
  { stream: "SaaS Subscriptions", year1: 2400000, year2: 3120000, year3: 4056000, year4: 5272800, year5: 6854640 },
  { stream: "Per-Claim Processing Fees", year1: 1800000, year2: 2340000, year3: 3042000, year4: 3954600, year5: 5141080 },
  { stream: "Premium Analytics Package", year1: 960000, year2: 1248000, year3: 1622400, year4: 2109120, year5: 2741856 },
  { stream: "Enterprise Integration Services", year1: 720000, year2: 936000, year3: 1216800, year4: 1581840, year5: 2056392 },
  { stream: "API Access & Developer Fees", year1: 480000, year2: 624000, year3: 811200, year4: 1054560, year5: 1370928 },
  { stream: "Training & Support Services", year1: 360000, year2: 468000, year3: 608400, year4: 790920, year5: 1028196 },
  { stream: "Compliance Consulting", year1: 240000, year2: 312000, year3: 405600, year4: 527280, year5: 685464 },
  { stream: "Data Insights & Reports", year1: 180000, year2: 234000, year3: 304200, year4: 395460, year5: 514098 },
];

const capex = [
  { item: "Development Workstations", quantity: 20, unitCost: 3000 },
  { item: "Server Infrastructure", quantity: 8, unitCost: 12000 },
  { item: "Security Hardware", quantity: 5, unitCost: 8000 },
  { item: "Office Equipment", quantity: 15, unitCost: 2000 },
  { item: "Software Licenses", quantity: 1, unitCost: 150000 },
  { item: "Initial Setup & Integration", quantity: 1, unitCost: 200000 },
];

const opex = [
  { category: "Cloud Infrastructure & Hosting", cost: 360000 },
  { category: "Software Development Team", cost: 1800000 },
  { category: "Sales & Marketing", cost: 900000 },
  { category: "Customer Support", cost: 480000 },
  { category: "Security & Compliance", cost: 240000 },
  { category: "Data Storage & Processing", cost: 180000 },
  { category: "Legal & Regulatory", cost: 120000 },
  { category: "General & Administrative", cost: 300000 },
  { category: "Training & Certifications", cost: 96000 },
  { category: "Research & Development", cost: 264000 },
];

const plSummary = [
  { year: "Year 1", revenue: 7140000, expenditure: 4380000, profit: 2760000, margin: "38.7%" },
  { year: "Year 2", revenue: 9282000, expenditure: 5694000, profit: 3588000, margin: "38.7%" },
  { year: "Year 3", revenue: 12066600, expenditure: 7402200, profit: 4664400, margin: "38.7%" },
  { year: "Year 4", revenue: 15686580, expenditure: 9622860, profit: 6063720, margin: "38.7%" },
  { year: "Year 5", revenue: 20392654, expenditure: 12509868, profit: 7882786, margin: "38.7%" },
];

const targetMarket = [
  { segment: "Small Healthcare Providers (1-10 providers)", size: 245000, avgSpendLakh: 12, penetration: 2.5, revenueCrore: 735 },
  { segment: "Medium Healthcare Systems (11-50 providers)", size: 89000, avgSpendLakh: 45, penetration: 5, revenueCrore: 2002.5 },
  { segment: "Large Hospital Networks (51+ providers)", size: 12000, avgSpendLakh: 180, penetration: 8, revenueCrore: 1728 },
  { segment: "Insurance Companies (Regional)", size: 850, avgSpendLakh: 250, penetration: 12, revenueCrore: 25.5 },
  { segment: "Insurance Companies (National)", size: 120, avgSpendLakh: 800, penetration: 25, revenueCrore: 24 },
  { segment: "Government/Medicare Agencies", size: 50, avgSpendLakh: 500, penetration: 40, revenueCrore: 10 },
  { segment: "Third-Party Billing Companies", size: 3200, avgSpendLakh: 35, penetration: 15, revenueCrore: 16.8 },
];

// Populate tables
function populateTable(id, data, columns) {
  const tbody = document.querySelector(`#${id} tbody`);
  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      let val = row[col];
      
      if (typeof val === 'number' && col.toLowerCase().includes('cost') || col.toLowerCase().includes('price') || col.toLowerCase().includes('revenue') || col.toLowerCase().includes('profit') || col.toLowerCase().includes('amount')) {
        val = formatINR(val);
      }
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Financial Metrics Table
  populateTable('metrics-table', financialMetrics, ["metric", "year1", "year2", "year3"]);

  // Pricing Strategy Table (convert prices excluding text)
  const pricingToShow = pricingStrategy.map(item => {
    let price = item.priceUSD;
    if (typeof price === 'number') price = formatINR(price * USD_TO_INR);
    return {
      tier: item.tier,
      target: item.target,
      price: price,
      features: item.features
    };
  });
  populateTable('pricing-table', pricingToShow, ["tier", "target", "price", "features"]);

  // Revenue Streams (convert all years)
  const revenueWithINR = revenueStreams.map(row => {
    return {
      stream: row.stream,
      year1: row.year1 * USD_TO_INR,
      year2: row.year2 * USD_TO_INR,
      year3: row.year3 * USD_TO_INR,
      year4: row.year4 * USD_TO_INR,
      year5: row.year5 * USD_TO_INR,
    };
  });
  populateTable('revenue-table', revenueWithINR, ["stream", "year1", "year2", "year3", "year4", "year5"]);

  // CapEx Table (convert cost columns)
  const capexWithINR = capex.map(item => {
    return {
      item: item.item,
      quantity: item.quantity,
      unitCost: formatINR(item.unitCost),
      totalCost: formatINR(item.unitCost * item.quantity)
    };
  });
  populateTable('capex-table', capexWithINR, ["item", "quantity", "unitCost", "totalCost"]);

  // OpEx Table (convert cost)
  const opexWithINR = opex.map(item => {
    return {
      category: item.category,
      cost: item.cost * USD_TO_INR
    };
  });
  populateTable('opex-table', opexWithINR, ["category", "cost"]);

  // Profit & Loss Table (convert values)
  const plWithINR = plSummary.map(row => {
    return {
      year: row.year,
      revenue: row.revenue * USD_TO_INR,
      expenditure: row.expenditure * USD_TO_INR,
      profit: row.profit * USD_TO_INR,
      margin: row.margin
    };
  });
  populateTable('pl-table', plWithINR, ["year", "revenue", "expenditure", "profit", "margin"]);

  // Target Market Analysis (already in INR lakhs/crores, format numeric)
  populateTable('market-table', targetMarket, ["segment", "size", "avgSpendLakh", "penetration", "revenueCrore"]);
});
