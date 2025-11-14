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

