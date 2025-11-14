import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserInfo from "@/components/Profile/UserInfo";
import SettingsForm from "@/components/Profile/SettingsForm";
import MetricsCard from "@/components/Dashboard/MetricsCard";
import { userProfile, dashboardMetrics } from "@/lib/mockData";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* User Information */}
            <div>
              <UserInfo user={userProfile} />
            </div>

            {/* Account Settings */}
            <div className="lg:col-span-2">
              <SettingsForm />
            </div>
          </div>

          {/* Analytics Summary */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h5 className="text-lg font-semibold">Your Analytics Summary</h5>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricsCard
                    title="Total Transactions"
                    value={dashboardMetrics.totalTransactions.toLocaleString()}
                  />
                  <MetricsCard
                    title="Fraud Detected"
                    value={dashboardMetrics.fraudDetected}
                  />
                  <MetricsCard
                    title="Risk Score"
                    value={dashboardMetrics.riskScore.toFixed(1)}
                  />
                  <MetricsCard title="Active Alerts" value={dashboardMetrics.alerts} />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h5 className="text-lg font-semibold">Security</h5>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Change Password</h6>
                      <small className="text-gray-500">Last changed 30 days ago</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Active Sessions</h6>
                      <small className="text-gray-500">3 active sessions</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      Manage
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">API Keys</h6>
                      <small className="text-gray-500">2 active API keys</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      View
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Login History</h6>
                      <small className="text-gray-500">View recent login attempts</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
