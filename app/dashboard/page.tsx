import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MetricsCard from "@/components/Dashboard/MetricsCard";
import FraudChart from "@/components/Dashboard/FraudChart";
import AlertsTable from "@/components/Dashboard/AlertsTable";
import ActivityFeed from "@/components/Dashboard/ActivityFeed";
import {
  dashboardMetrics,
  fraudAlerts,
  fraudTrendData,
  transactionVolumeData,
  fraudByCategory,
  riskDistribution,
  activityFeed,
} from "@/lib/mockData";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! Here's your fraud detection overview.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                <span className="mr-2">📊</span>Generate Report
              </button>
              <Link
                href="/profile"
                className="px-4 py-2 bg-[#6f42c1] text-white rounded-lg hover:bg-[#5a32a3] transition-colors"
              >
                <span className="mr-2">👤</span>Profile
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Transactions"
              value={dashboardMetrics.totalTransactions.toLocaleString()}
              change="+12.5% from last month"
              icon="💳"
              color="primary"
            />
            <MetricsCard
              title="Fraud Detected"
              value={dashboardMetrics.fraudDetected}
              change="+5.2% from last month"
              icon="🚨"
              color="danger"
            />
            <MetricsCard
              title="Risk Score"
              value={dashboardMetrics.riskScore.toFixed(1)}
              change="-2.1% from last month"
              icon="📈"
              color="warning"
            />
            <MetricsCard
              title="Active Alerts"
              value={dashboardMetrics.alerts}
              change="+3 new today"
              icon="🔔"
              color="info"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <FraudChart
              type="line"
              data={fraudTrendData}
              title="Fraud Detection Trends"
              dataKey="value"
            />
            <FraudChart
              type="area"
              data={transactionVolumeData}
              title="Transaction Volume Over Time"
              dataKey="value"
            />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <FraudChart type="pie" data={fraudByCategory} title="Fraud by Category" />
            <FraudChart
              type="bar"
              data={riskDistribution}
              title="Risk Distribution"
              dataKey="count"
            />
          </div>

          {/* Alerts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <AlertsTable alerts={fraudAlerts} />
            </div>
            <div>
              <ActivityFeed activities={activityFeed} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h5 className="text-lg font-semibold">Quick Actions</h5>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <button className="px-4 py-6 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">📝</span>
                    <span>Report Fraud</span>
                  </div>
                </button>
                <button className="px-4 py-6 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">📊</span>
                    <span>View Reports</span>
                  </div>
                </button>
                <button className="px-4 py-6 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">⚙️</span>
                    <span>Settings</span>
                  </div>
                </button>
                <button className="px-4 py-6 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">📥</span>
                    <span>Export Data</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
