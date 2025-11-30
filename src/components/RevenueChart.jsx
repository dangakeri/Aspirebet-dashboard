import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { useGetMonthlyAnalytics } from "../hooks/useGetAnalytics";

export default function RevenueChart() {
  const { monthlyAnalytics, isLoading } = useGetMonthlyAnalytics();

  const chartData = Array.isArray(monthlyAnalytics)
    ? monthlyAnalytics.map((item) => {
        const date = new Date(item.year, item.month - 1);
        return {
          date: format(date, "MMM/yy"),
          revenue: item.revenue,
          betAmount: item.betAmount,
          winAmount: item.winAmount,
        };
      })
    : [];

  let growthRate = 0;
  if (chartData.length >= 2) {
    const current = chartData[chartData.length - 1].revenue;
    const previous = chartData[chartData.length - 2].revenue;
    if (previous > 0) {
      growthRate = ((current - previous) / previous) * 100;
    }
  }

  return (
    <div className="p-4 sm:p-6 rounded bg-white w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
        <h2 className="font-semibold text-base sm:text-lg text-gray-800">
          Overview
        </h2>
        <span
          className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
            growthRate >= 0
              ? "text-green-600 bg-green-100"
              : "text-red-500 bg-red-100"
          }`}
        >
          {growthRate >= 0 ? "+" : ""}
          {growthRate.toFixed(2)}% this month
        </span>
      </div>

      {/* Chart */}
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3, stroke: "#3B82F6", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 5 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="betAmount"
                stroke="#10B981"
                strokeWidth={2}
                dot={{
                  r: 3,
                  stroke: "rgba(16, 185, 129, 1)",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
                activeDot={{ r: 5 }}
                name="Bet Amount"
              />
              <Line
                type="monotone"
                dataKey="winAmount"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 3, stroke: "#F59E0B", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 5 }}
                name="Win Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
