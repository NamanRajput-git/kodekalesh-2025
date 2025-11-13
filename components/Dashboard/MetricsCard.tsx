interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  color?: string;
}

export default function MetricsCard({
  title,
  value,
  change,
  icon,
  color = "primary",
}: MetricsCardProps) {
  const colorClasses: Record<string, string> = {
    primary: "text-[#6f42c1]",
    danger: "text-[#dc3545]",
    warning: "text-[#ffc107]",
    info: "text-[#17a2b8]",
    success: "text-[#28a745]",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex justify-between items-start mb-3">
        <h6 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h6>
        {icon && <div className={colorClasses[color] || colorClasses.primary}>{icon}</div>}
      </div>
      <h3 className="text-3xl font-bold mb-2 text-gray-900">{value}</h3>
      {change && (
        <small
          className={`text-sm ${
            change.startsWith("+") ? "text-[#28a745]" : "text-[#dc3545]"
          }`}
        >
          {change}
        </small>
      )}
    </div>
  );
}
