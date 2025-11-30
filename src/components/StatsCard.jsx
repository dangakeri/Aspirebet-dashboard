function StatsCard({
  icon,
  title,
  number,
  color,
  bgColor,
  change,
  isLoss = false,
}) {
  return (
    <div className="p-4 rounded shadow bg-white flex-1">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-sm sm:text-sm truncate">{title}</p>
          <h3
            className={`text-xl ${
              isLoss ? "text-red-700" : "text-gray-700"
            }  sm:text-2xl font-semibold truncate`}
          >
            {number}
          </h3>
          <p
            className={`text-xs sm:text-sm ${
              change.includes("+") ? "text-green-600" : "text-green-600"
            }`}
          >
            {change}
          </p>
        </div>
        <div
          className={`text-white p-2 rounded-full ${bgColor} ${color} flex-shrink-0`}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
