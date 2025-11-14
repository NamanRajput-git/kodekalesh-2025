// Mock data for the financial fraud detection platform

export interface DashboardMetrics {
  totalTransactions: number;
  fraudDetected: number;
  riskScore: number;
  alerts: number;
  totalAmount: number;
  suspiciousTransactions: number;
}

export interface FraudAlert {
  id: string;
  transactionId: string;
  amount: number;
  type: string;
  status: "pending" | "investigating" | "resolved" | "false_positive";
  timestamp: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  description: string;
}

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  riskScore: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  organization?: string;
  joinedDate: string;
}

export const dashboardMetrics: DashboardMetrics = {
  totalTransactions: 125430,
  fraudDetected: 342,
  riskScore: 7.2,
  alerts: 28,
  totalAmount: 45230000,
  suspiciousTransactions: 89,
};

export const fraudAlerts: FraudAlert[] = [
  {
    id: "1",
    transactionId: "TXN-2024-001234",
    amount: 45000,
    type: "Unusual Pattern",
    status: "investigating",
    timestamp: "2024-01-15T10:30:00Z",
    riskLevel: "high",
    description: "Multiple high-value transactions in short time period",
  },
  {
    id: "2",
    transactionId: "TXN-2024-001189",
    amount: 12000,
    type: "Location Mismatch",
    status: "pending",
    timestamp: "2024-01-15T09:15:00Z",
    riskLevel: "medium",
    description: "Transaction from unusual geographic location",
  },
  {
    id: "3",
    transactionId: "TXN-2024-000987",
    amount: 8900,
    type: "Velocity Check",
    status: "resolved",
    timestamp: "2024-01-14T16:45:00Z",
    riskLevel: "low",
    description: "Resolved - Verified with customer",
  },
  {
    id: "4",
    transactionId: "TXN-2024-000876",
    amount: 156000,
    type: "Amount Threshold",
    status: "investigating",
    timestamp: "2024-01-14T14:20:00Z",
    riskLevel: "critical",
    description: "Transaction exceeds normal threshold by 500%",
  },
  {
    id: "5",
    transactionId: "TXN-2024-000765",
    amount: 3400,
    type: "Device Fingerprint",
    status: "false_positive",
    timestamp: "2024-01-14T11:10:00Z",
    riskLevel: "low",
    description: "False positive - Device verified",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "TXN-2024-001234",
    amount: 45000,
    merchant: "Tech Solutions Inc",
    category: "Electronics",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
    riskScore: 8.5,
  },
  {
    id: "TXN-2024-001189",
    amount: 12000,
    merchant: "Global Retail",
    category: "Shopping",
    timestamp: "2024-01-15T09:15:00Z",
    status: "completed",
    riskScore: 6.2,
  },
  {
    id: "TXN-2024-000987",
    amount: 8900,
    merchant: "Food Express",
    category: "Food & Dining",
    timestamp: "2024-01-14T16:45:00Z",
    status: "completed",
    riskScore: 3.1,
  },
  {
    id: "TXN-2024-000876",
    amount: 156000,
    merchant: "Luxury Brands",
    category: "Luxury",
    timestamp: "2024-01-14T14:20:00Z",
    status: "pending",
    riskScore: 9.8,
  },
  {
    id: "TXN-2024-000765",
    amount: 3400,
    merchant: "Quick Mart",
    category: "Groceries",
    timestamp: "2024-01-14T11:10:00Z",
    status: "completed",
    riskScore: 2.5,
  },
];

export const fraudTrendData: ChartDataPoint[] = [
  { date: "2024-01-01", value: 12 },
  { date: "2024-01-02", value: 15 },
  { date: "2024-01-03", value: 18 },
  { date: "2024-01-04", value: 14 },
  { date: "2024-01-05", value: 22 },
  { date: "2024-01-06", value: 19 },
  { date: "2024-01-07", value: 25 },
  { date: "2024-01-08", value: 28 },
  { date: "2024-01-09", value: 24 },
  { date: "2024-01-10", value: 30 },
  { date: "2024-01-11", value: 27 },
  { date: "2024-01-12", value: 32 },
  { date: "2024-01-13", value: 29 },
  { date: "2024-01-14", value: 35 },
  { date: "2024-01-15", value: 28 },
];

export const transactionVolumeData: ChartDataPoint[] = [
  { date: "2024-01-01", value: 8500 },
  { date: "2024-01-02", value: 9200 },
  { date: "2024-01-03", value: 8800 },
  { date: "2024-01-04", value: 10100 },
  { date: "2024-01-05", value: 9600 },
  { date: "2024-01-06", value: 11200 },
  { date: "2024-01-07", value: 10800 },
  { date: "2024-01-08", value: 12500 },
  { date: "2024-01-09", value: 11800 },
  { date: "2024-01-10", value: 13200 },
  { date: "2024-01-11", value: 12800 },
  { date: "2024-01-12", value: 14100 },
  { date: "2024-01-13", value: 13500 },
  { date: "2024-01-14", value: 14800 },
  { date: "2024-01-15", value: 14200 },
];

export const fraudByCategory = [
  { name: "Card Fraud", value: 45, color: "#dc3545" },
  { name: "Identity Theft", value: 28, color: "#ffc107" },
  { name: "Account Takeover", value: 18, color: "#17a2b8" },
  { name: "Phishing", value: 9, color: "#6f42c1" },
];

export const riskDistribution = [
  { level: "Low", count: 245, color: "#28a745" },
  { level: "Medium", count: 67, color: "#ffc107" },
  { level: "High", count: 24, color: "#fd7e14" },
  { level: "Critical", count: 6, color: "#dc3545" },
];

export const userProfile: UserProfile = {
  id: "user-001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  role: "Fraud Analyst",
  phone: "+91 98765 43210",
  organization: "Financial Services Corp",
  joinedDate: "2023-06-15",
};

export const activityFeed = [
  {
    id: "1",
    type: "alert",
    message: "New fraud alert detected: TXN-2024-001234",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "transaction",
    message: "Transaction processed: ₹45,000 to Tech Solutions Inc",
    timestamp: "2024-01-15T10:25:00Z",
  },
  {
    id: "3",
    type: "resolution",
    message: "Alert TXN-2024-000987 marked as resolved",
    timestamp: "2024-01-14T17:00:00Z",
  },
  {
    id: "4",
    type: "transaction",
    message: "Transaction processed: ₹12,000 to Global Retail",
    timestamp: "2024-01-15T09:15:00Z",
  },
  {
    id: "5",
    type: "alert",
    message: "High-risk transaction flagged: TXN-2024-000876",
    timestamp: "2024-01-14T14:20:00Z",
  },
];

export interface FraudDetail {
  id: string;
  problem: {
    title: string;
    description: string;
    indicators: string[];
    impact: string;
    severity: "low" | "medium" | "high" | "critical";
  };
  solutions: {
    immediate: {
      title: string;
      actions: Array<{
        step: string;
        description: string;
        priority: "high" | "medium" | "low";
      }>;
    };
    preventive: {
      title: string;
      recommendations: Array<{
        category: string;
        items: string[];
      }>;
    };
    longTerm: {
      title: string;
      strategies: Array<{
        strategy: string;
        description: string;
        timeline: string;
      }>;
    };
  };
  transactionDetails: {
    merchant: string;
    category: string;
    location: string;
    device: string;
    ipAddress: string;
    paymentMethod: string;
  };
}

export const fraudDetails: Record<string, FraudDetail> = {
  "1": {
    id: "1",
    problem: {
      title: "Unusual Transaction Pattern - Velocity Attack",
      description:
        "Detected multiple high-value transactions (₹45,000 each) within a 15-minute window from the same account. This pattern indicates a potential velocity attack where fraudsters attempt to drain funds quickly before detection.",
      indicators: [
        "5 transactions totaling ₹225,000 in 15 minutes",
        "Transactions exceed normal spending pattern by 800%",
        "All transactions to same merchant category",
        "No prior transaction history with these merchants",
        "Transactions initiated from new device",
      ],
      impact:
        "High financial risk with potential loss of ₹225,000. Immediate action required to prevent further unauthorized transactions.",
      severity: "high",
    },
    solutions: {
      immediate: {
        title: "Immediate Actions",
        actions: [
          {
            step: "1. Freeze Account",
            description:
              "Immediately freeze the affected account to prevent further unauthorized transactions. Notify the account holder via SMS and email.",
            priority: "high",
          },
          {
            step: "2. Block Merchant",
            description:
              "Temporarily block all transactions to the merchant 'Tech Solutions Inc' until verification is complete.",
            priority: "high",
          },
          {
            step: "3. Contact Customer",
            description:
              "Reach out to the customer via phone within 15 minutes to verify transaction legitimacy. Document the conversation.",
            priority: "high",
          },
          {
            step: "4. Review Recent Transactions",
            description:
              "Audit all transactions from the last 24 hours to identify any additional suspicious activity patterns.",
            priority: "medium",
          },
        ],
      },
      preventive: {
        title: "Preventive Measures",
        recommendations: [
          {
            category: "Transaction Limits",
            items: [
              "Implement velocity limits: Max ₹50,000 per hour per account",
              "Set daily transaction limit of ₹200,000",
              "Require additional authentication for transactions > ₹25,000",
            ],
          },
          {
            category: "Monitoring Rules",
            items: [
              "Enable real-time alerts for 3+ transactions in 30 minutes",
              "Flag transactions from new devices automatically",
              "Monitor merchant category patterns for anomalies",
            ],
          },
          {
            category: "Authentication",
            items: [
              "Require 2FA for high-value transactions",
              "Implement device fingerprinting",
              "Add biometric verification for amounts > ₹30,000",
            ],
          },
        ],
      },
      longTerm: {
        title: "Long-term Strategies",
        strategies: [
          {
            strategy: "Machine Learning Enhancement",
            description:
              "Train ML models on velocity attack patterns to improve detection accuracy and reduce false positives.",
            timeline: "3-4 months",
          },
          {
            strategy: "Behavioral Analytics",
            description:
              "Implement user behavior profiling to establish baseline spending patterns and detect deviations more effectively.",
            timeline: "6 months",
          },
          {
            strategy: "Real-time Risk Engine",
            description:
              "Deploy advanced risk scoring engine that evaluates multiple factors simultaneously for faster decision-making.",
            timeline: "4-5 months",
          },
        ],
      },
    },
    transactionDetails: {
      merchant: "Tech Solutions Inc",
      category: "Electronics",
      location: "Mumbai, Maharashtra",
      device: "iPhone 14 Pro (New Device)",
      ipAddress: "103.45.67.89",
      paymentMethod: "Credit Card ending in 4532",
    },
  },
  "2": {
    id: "2",
    problem: {
      title: "Geographic Location Mismatch",
      description:
        "Transaction detected from an unusual geographic location. The account holder's registered location is Delhi, but the transaction originated from Mumbai with no prior travel history or location change notification.",
      indicators: [
        "Transaction from Mumbai (1,400 km from registered location)",
        "No prior transactions from this location",
        "IP address geolocation mismatch",
        "Transaction within 2 hours of last Delhi transaction",
        "New device and browser fingerprint",
      ],
      impact:
        "Medium risk of account takeover or card-not-present fraud. Potential loss of ₹12,000 if unauthorized.",
      severity: "medium",
    },
    solutions: {
      immediate: {
        title: "Immediate Actions",
        actions: [
          {
            step: "1. Verify Location",
            description:
              "Send SMS with location verification code. If customer confirms travel, update location preferences.",
            priority: "high",
          },
          {
            step: "2. Require Additional Authentication",
            description:
              "Request OTP verification before processing the transaction. If OTP fails, block the transaction.",
            priority: "high",
          },
          {
            step: "3. Review Account Activity",
            description:
              "Check for any other transactions from new locations in the past 48 hours.",
            priority: "medium",
          },
        ],
      },
      preventive: {
        title: "Preventive Measures",
        recommendations: [
          {
            category: "Location Monitoring",
            items: [
              "Implement geofencing alerts for transactions >500km from home location",
              "Require location verification for first transaction from new city",
              "Allow customers to pre-register travel locations",
            ],
          },
          {
            category: "Device Management",
            items: [
              "Track and verify new device logins",
              "Send notification emails for new device access",
              "Maintain device whitelist for trusted devices",
            ],
          },
        ],
      },
      longTerm: {
        title: "Long-term Strategies",
        strategies: [
          {
            strategy: "Advanced Geolocation",
            description:
              "Integrate with GPS and mobile network data for more accurate location verification.",
            timeline: "5-6 months",
          },
          {
            strategy: "Travel Pattern Learning",
            description:
              "Build ML model to learn customer travel patterns and reduce false positives for legitimate travel.",
            timeline: "6 months",
          },
        ],
      },
    },
    transactionDetails: {
      merchant: "Global Retail",
      category: "Shopping",
      location: "Mumbai, Maharashtra",
      device: "Samsung Galaxy S23 (New Device)",
      ipAddress: "182.65.123.45",
      paymentMethod: "Debit Card ending in 7890",
    },
  },
  "4": {
    id: "4",
    problem: {
      title: "Excessive Amount Threshold Violation",
      description:
        "Transaction amount of ₹156,000 exceeds the customer's normal transaction threshold by 500%. The account typically processes transactions averaging ₹3,000-₹5,000, making this transaction highly anomalous.",
      indicators: [
        "Transaction amount: ₹156,000 (500% above average)",
        "No prior transactions > ₹50,000 in account history",
        "Transaction to luxury merchant category",
        "Initiated during non-business hours (2:20 AM)",
        "Single transaction exceeds monthly average spending",
      ],
      impact:
        "Critical financial risk. If fraudulent, represents significant loss. Immediate intervention required.",
      severity: "critical",
    },
    solutions: {
      immediate: {
        title: "Immediate Actions",
        actions: [
          {
            step: "1. Hold Transaction",
            description:
              "Immediately place transaction on hold. Do not process until customer verification is complete.",
            priority: "high",
          },
          {
            step: "2. Contact Customer Urgently",
            description:
              "Call customer immediately (within 5 minutes) at registered phone number. If no response, escalate to fraud team.",
            priority: "high",
          },
          {
            step: "3. Verify Transaction Details",
            description:
              "Confirm merchant name, amount, and transaction purpose directly with customer before processing.",
            priority: "high",
          },
          {
            step: "4. Review Account Security",
            description:
              "Check for any signs of account compromise, password changes, or suspicious login activity.",
            priority: "high",
          },
        ],
      },
      preventive: {
        title: "Preventive Measures",
        recommendations: [
          {
            category: "Amount Limits",
            items: [
              "Set dynamic spending limits based on customer history",
              "Require manager approval for transactions >100% of average",
              "Implement graduated authentication for high-value transactions",
            ],
          },
          {
            category: "Time-based Rules",
            items: [
              "Flag transactions during unusual hours (11 PM - 6 AM)",
              "Require additional verification for off-hours high-value transactions",
              "Send immediate SMS alerts for transactions > ₹100,000",
            ],
          },
          {
            category: "Merchant Category Monitoring",
            items: [
              "Monitor transactions to luxury/high-value merchant categories",
              "Require pre-authorization for first-time luxury purchases",
              "Implement category-based spending limits",
            ],
          },
        ],
      },
      longTerm: {
        title: "Long-term Strategies",
        strategies: [
          {
            strategy: "Adaptive Spending Limits",
            description:
              "Develop ML model that learns individual spending patterns and dynamically adjusts limits based on behavior.",
            timeline: "4-5 months",
          },
          {
            strategy: "Predictive Risk Scoring",
            description:
              "Build predictive models that assess transaction risk before processing, considering amount, time, location, and merchant.",
            timeline: "6 months",
          },
        ],
      },
    },
    transactionDetails: {
      merchant: "Luxury Brands",
      category: "Luxury",
      location: "Delhi, NCR",
      device: "MacBook Pro (Trusted Device)",
      ipAddress: "192.168.1.45",
      paymentMethod: "Credit Card ending in 1234",
    },
  },
};

