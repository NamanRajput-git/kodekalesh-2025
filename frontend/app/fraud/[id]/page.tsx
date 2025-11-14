import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fraudAlerts, fraudDetails } from "@/lib/mockData";
import { FraudDetail } from "@/lib/mockData";

export default async function FraudDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const alert = fraudAlerts.find((a) => a.id === id);
  const detail: FraudDetail | undefined = fraudDetails[id];

  if (!alert) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Fraud Alert Not Found</h1>
            <Link
              href="/dashboard"
              className="text-[#6f42c1] hover:underline"
            >
              Return to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-100 text-green-800 border-green-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      high: "bg-orange-100 text-orange-800 border-orange-300",
      critical: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[severity] || colors.medium;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-blue-500",
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="text-[#6f42c1] hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Fraud Alert Details</h1>
                <p className="text-gray-600">
                  Transaction ID: <code className="bg-gray-100 px-2 py-1 rounded">{alert.transactionId}</code>
                </p>
              </div>
              <div className="flex gap-3">
                <span
                  className={`px-4 py-2 rounded-lg font-semibold border-2 ${getSeverityColor(
                    detail?.problem.severity || alert.riskLevel
                  )}`}
                >
                  {detail?.problem.severity.toUpperCase() || alert.riskLevel.toUpperCase()} RISK
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Transaction Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{alert.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Type</p>
                <p className="text-lg font-semibold text-gray-900">{alert.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Detected</p>
                <p className="text-lg text-gray-900">{formatDate(alert.timestamp)}</p>
              </div>
              {detail && (
                <>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Merchant</p>
                    <p className="text-lg text-gray-900">{detail.transactionDetails.merchant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="text-lg text-gray-900">{detail.transactionDetails.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-lg text-gray-900">{detail.transactionDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Device</p>
                    <p className="text-lg text-gray-900">{detail.transactionDetails.device}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">IP Address</p>
                    <p className="text-lg text-gray-900 font-mono">{detail.transactionDetails.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="text-lg text-gray-900">{detail.transactionDetails.paymentMethod}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Problem Analysis */}
          {detail && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚨</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Problem Analysis</h2>
                  <p className="text-sm text-gray-600">Detailed fraud detection analysis</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{detail.problem.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{detail.problem.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900">Key Indicators</h4>
                <ul className="space-y-2">
                  {detail.problem.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-gray-700">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <h4 className="font-semibold text-red-900 mb-2">Impact Assessment</h4>
                <p className="text-red-800">{detail.problem.impact}</p>
              </div>
            </div>
          )}

          {/* Solutions Section */}
          {detail && (
            <div className="space-y-6">
              {/* Immediate Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{detail.solutions.immediate.title}</h2>
                    <p className="text-sm text-gray-600">Take these steps immediately</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {detail.solutions.immediate.actions.map((action, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#6f42c1] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 rounded-full ${getPriorityColor(
                            action.priority
                          )} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}
                        >
                          {action.priority === "high" ? "!" : action.priority === "medium" ? "~" : "•"}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{action.step}</h4>
                          <p className="text-gray-700 leading-relaxed">{action.description}</p>
                          <div className="mt-2">
                            <button className="px-4 py-2 bg-[#6f42c1] text-white rounded-lg hover:bg-[#5a32a3] transition-colors text-sm font-medium">
                              Execute Action
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventive Measures */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{detail.solutions.preventive.title}</h2>
                    <p className="text-sm text-gray-600">Recommended preventive controls</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {detail.solutions.preventive.recommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{rec.category}</h4>
                      <ul className="space-y-2">
                        {rec.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-3 px-4 py-2 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors text-sm font-medium">
                        Configure Rules
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long-term Strategies */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{detail.solutions.longTerm.title}</h2>
                    <p className="text-sm text-gray-600">Strategic improvements for future prevention</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {detail.solutions.longTerm.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{strategy.strategy}</h4>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {strategy.timeline}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{strategy.description}</p>
                      <button className="px-4 py-2 border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors text-sm font-medium">
                        Create Project Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-[#6f42c1] text-white rounded-lg hover:bg-[#5a32a3] transition-colors font-semibold">
              Mark as Resolved
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Export Report
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Share with Team
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

