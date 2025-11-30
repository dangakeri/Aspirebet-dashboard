import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#10B981", "#FF0000"];

export default function CustomerActivityChart({ deposits, withdrawals }) {
  const data = [
    { name: "Deposits", value: deposits },
    { name: "Withdrawals", value: withdrawals },
  ];
  return (
    <div className="p-4 rounded-xl">
      <h2 className="font-semibold text-black text-lg">
        Transactions Activity
      </h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3  bg-[#10B981] rounded-full"></div>
          <span className="text-black">Deposits</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#FF0000] rounded-full"></div>
          <span className="text-black">Withdrawals</span>
        </div>
      </div>
    </div>
  );
}
