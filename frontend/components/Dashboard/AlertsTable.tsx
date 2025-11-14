import { FraudAlert } from "@/lib/mockData";
import Link from "next/link";

interface AlertsTableProps {
  alerts: FraudAlert[];
}

export default function AlertsTable({ alerts }: AlertsTableProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-[#ffc107]", text: "text-gray-900", label: "Pending" },
      investigating: { bg: "bg-[#17a2b8]", text: "text-white", label: "Investigating" },
      resolved: { bg: "bg-[#28a745]", text: "text-white", label: "Resolved" },
      false_positive: { bg: "bg-gray-500", text: "text-white", label: "False Positive" },
    };
    const statusInfo = statusMap[status] || {
      bg: "bg-gray-500",
      text: "text-white",
      label: status,
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}
      >
        {statusInfo.label}
      </span>
    );
  };

  const getRiskBadge = (riskLevel: string) => {
    const riskMap: Record<string, { bg: string; text: string }> = {
      low: { bg: "bg-[#28a745]", text: "text-white" },
      medium: { bg: "bg-[#ffc107]", text: "text-gray-900" },
      high: { bg: "bg-[#dc3545]", text: "text-white" },
      critical: { bg: "bg-[#dc3545]", text: "text-white" },
    };
    const riskInfo = riskMap[riskLevel] || { bg: "bg-gray-500", text: "text-white" };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${riskInfo.bg} ${riskInfo.text}`}
      >
        {riskLevel.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h5 className="text-lg font-semibold">Recent Fraud Alerts</h5>
        <Link
          href="/dashboard/alerts"
          className="px-3 py-1.5 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-md hover:bg-[#6f42c1] hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {alert.transactionId}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  ₹{alert.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {alert.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getRiskBadge(alert.riskLevel)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(alert.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(alert.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/fraud/${alert.id}`}
                    className="px-3 py-1.5 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-md hover:bg-[#6f42c1] hover:text-white transition-colors inline-block"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
