"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FraudChartProps {
  type: "line" | "area" | "pie" | "bar";
  data: any[];
  title: string;
  dataKey?: string;
  colors?: string[];
}

export default function FraudChart({
  type,
  data,
  title,
  dataKey = "value",
  colors = ["#6f42c1", "#28a745", "#ffc107", "#dc3545", "#17a2b8"],
}: FraudChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                style={{ fontSize: "12px" }}
              />
              <YAxis style={{ fontSize: "12px" }} />
              <Tooltip
                labelFormatter={(label) => formatDate(label)}
                formatter={(value: number) => [value, "Count"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#6f42c1"
                strokeWidth={2}
                name="Fraud Cases"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                style={{ fontSize: "12px" }}
              />
              <YAxis style={{ fontSize: "12px" }} />
              <Tooltip
                labelFormatter={(label) => formatDate(label)}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#6f42c1"
                fill="#6f42c1"
                fillOpacity={0.3}
                name="Transaction Volume"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" style={{ fontSize: "12px" }} />
              <YAxis style={{ fontSize: "12px" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6f42c1" name="Transaction Count">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h5 className="text-lg font-semibold">{title}</h5>
      </div>
      <div className="p-6">{renderChart()}</div>
    </div>
  );
}

