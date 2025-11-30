import { useState } from "react";
import { FiCalendar, FiFilter, FiDownload } from "react-icons/fi";
import {
  Bag,
  Card,
  CardRemove,
  Coin1,
  EmptyWallet,
  EmptyWalletAdd,
  Profile,
  WalletMoney,
} from "iconsax-react";
import { TbTax } from "react-icons/tb";
import * as XLSX from "xlsx";
import { useGetAnalytics } from "../hooks/useGetAnalytics";
import { useFormatCurrency } from "../hooks/useFormatCurrency";
import Shimmer from "../components/Shimmer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  addDays,
} from "date-fns";
import StatsCard from "../components/StatsCard";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import InvoiceTable from "../components/InvoiceTable";
import RevenueChart from "../components/RevenueChart";
import CustomerActivityChart from "../components/CustomerActivityChart";

const DashboardHome = () => {
  const { formatCurrency } = useFormatCurrency();
  const today = new Date();

  // Initialize with today's date range
  const [dateRange, setDateRange] = useState([
    startOfDay(today),
    endOfDay(today),
  ]);
  const [startDate, endDate] = dateRange;
  const [activeFilter, setActiveFilter] = useState("today");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { analytics, isLoading, refetch } = useGetAnalytics(startDate, endDate);

  const exportToExcel = () => {
    const data = [
      ["Metric", "Value"],
      ["Registered Users", analytics?.analytics?.allUsers ?? 0],
      [
        "Total Revenue",
        formatCurrency(analytics?.analytics?.totalRevenue ?? 0),
      ],
      ["Bet Amount", formatCurrency(analytics?.analytics?.betAmount ?? 0)],
      ["Win Amount", formatCurrency(analytics?.analytics?.winAmount ?? 0)],
      ["Profit", formatCurrency(analytics?.analytics?.profit ?? 0)],
      [
        "Players Balance",
        formatCurrency(analytics?.analytics?.playerBalance ?? 0),
      ],
      [
        "Total Deposit",
        formatCurrency(analytics?.analytics?.totalDeposit ?? 0),
      ],
      [
        "Total Withdrawal",
        formatCurrency(analytics?.analytics?.totalWithdrawal ?? 0),
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analytics");

    const fileName = `Analytics_${format(startDate, "yyyy-MM-dd")}_to_${format(
      endDate,
      "yyyy-MM-dd"
    )}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const getFilterDetails = () => [
    {
      id: "today",
      label: "Today",
      dates: [startOfDay(today), endOfDay(today)],
    },
    {
      id: "yesterday",
      label: "Yesterday",
      dates: [startOfDay(subDays(today, 1)), endOfDay(subDays(today, 1))],
    },
    {
      id: "this_week",
      label: "This Week",
      dates: [startOfWeek(today), endOfWeek(today)],
    },
    {
      id: "last_week",
      label: "Last Week",
      dates: [startOfWeek(subDays(today, 7)), endOfWeek(subDays(today, 7))],
    },
    {
      id: "this_month",
      label: "This Month",
      dates: [startOfMonth(today), endOfMonth(today)],
    },
    {
      id: "last_month",
      label: "Last Month",
      dates: [
        startOfMonth(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        endOfMonth(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
      ],
    },
  ];

  const timeFilters = getFilterDetails();

  const handleFilterChange = (filterId) => {
    const filter = timeFilters.find((f) => f.id === filterId);
    setDateRange(filter.dates);
    setActiveFilter(filterId);
    setShowDatePicker(false);
    refetch();
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (!start && !end) {
      handleFilterChange("today");
      return;
    }
    if (start && !end) {
      const rangeLength = differenceInDays(today, start);
      const smartEndDate = rangeLength > 30 ? addDays(start, 30) : today;
      setDateRange([start, smartEndDate]);
      setActiveFilter("custom");
      return;
    }
    setDateRange([start, end]);
    if (start && end) setActiveFilter("custom");
  };

  const applyFilters = () => {
    refetch();
    setShowDatePicker(false);
  };

  const getActiveFilterLabel = () =>
    timeFilters.find((f) => f.id === activeFilter)?.label || "Custom Range";

  const items = timeFilters.map((filter) => ({
    key: filter.id,
    label: (
      <span
        className={
          activeFilter === filter.id ? "text-green-600 font-medium" : ""
        }
      >
        {filter.label}
      </span>
    ),
  }));

  return (
    <div className="lg:px-3 sm:px-5">
      {/* Filters Panel */}
      <div className="bg-white rounded-lg p-4 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h3 className="text-base sm:text-lg text-gray-700 font-semibold">
          Welcome back,
        </h3>
        <div className="flex flex-wrap gap-2">
          <Dropdown
            menu={{
              items,
              onClick: (e) => handleFilterChange(e.key),
              selectable: true,
              defaultSelectedKeys: [activeFilter],
            }}
            trigger={["click"]}
          >
            <Button>
              <Space>
                {getActiveFilterLabel()}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Button
            icon={<FiFilter size={14} />}
            onClick={() => setShowDatePicker(!showDatePicker)}
            type={activeFilter === "custom" ? "primary" : "default"}
            className={
              activeFilter === "custom" ? "bg-green-600 text-white" : ""
            }
          >
            Custom Range
          </Button>

          <Button
            icon={<FiDownload size={14} />}
            onClick={exportToExcel}
            disabled={isLoading}
            className="flex items-center"
          >
            Export
          </Button>
        </div>

        {showDatePicker && (
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 w-full">
            <div className="flex items-center rounded-md px-3 py-1.5 w-full sm:w-auto border">
              <FiCalendar className="text-gray-500 mr-2" />
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                placeholderText="Select date range"
                dateFormat="MMM d, yyyy"
                className="bg-transparent text-gray-700 outline-none w-full sm:w-48 text-sm"
              />
            </div>
            <Button
              type="primary"
              onClick={applyFilters}
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-6">
        <StatsCard
          icon={<Profile size="20" color="#4F46E5" />}
          color="text-blue-600"
          bgColor="bg-indigo-100"
          number={isLoading ? <Shimmer /> : analytics?.analytics?.allUsers ?? 0}
          title="Registered Users"
          change="Total registered users"
        />
        <StatsCard
          icon={<Coin1 size="20" color="#2563eb" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(
                analytics?.analytics?.totalRevenue ?? 0
              ).toUpperCase()
            )
          }
          title="Total Revenue"
          change="Total revenue earned"
        />
        <StatsCard
          icon={<WalletMoney size="20" color="#FF8A65" />}
          color="text-blue-600"
          bgColor="bg-orange-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(analytics?.analytics?.betAmount ?? 0).toUpperCase()
            )
          }
          title="Bet Amount"
          change="Total Bet Amount"
        />
        <StatsCard
          icon={<Bag size="20" color="#db2777" />}
          color="text-pink-600"
          bgColor="bg-pink-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(analytics?.analytics?.winAmount ?? 0).toUpperCase()
            )
          }
          title="Win Amount"
          change="Total win amount"
        />
        <StatsCard
          icon={<EmptyWallet size="20" color="#d97706" />}
          color="text-amber-600"
          bgColor="bg-amber-100"
          isLoss={analytics?.analytics?.isLoss}
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(analytics?.analytics?.profit ?? 0).toUpperCase()
            )
          }
          title={analytics?.analytics?.isLoss ? "Loss" : "Profit"}
          change={analytics?.analytics?.isLoss ? "Total Loss" : "Total profit"}
        />
        <StatsCard
          icon={<Card size="20" color="#ea580c" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(
                analytics?.analytics?.playerBalance ?? 0
              ).toUpperCase()
            )
          }
          title="Players Balance"
          change="Total players balance"
        />
        <StatsCard
          icon={<EmptyWalletAdd size="20" color="#ca8a04" />}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(
                analytics?.analytics?.totalDeposit ?? 0
              ).toUpperCase()
            )
          }
          title="Total Deposit"
          change="Total amount deposited"
        />
        <StatsCard
          icon={<CardRemove size="20" color="#dc2626" />}
          color="text-red-600"
          bgColor="bg-red-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(
                analytics?.analytics?.totalWithdrawal ?? 0
              ).toUpperCase()
            )
          }
          title="Total Withdraw"
          change="Total amount withdrawn"
        />
        <StatsCard
          icon={<TbTax size="20" color="#FF6D00" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
          number={
            isLoading ? (
              <Shimmer />
            ) : (
              formatCurrency(
                analytics?.analytics?.totalTaxPaid ?? 0
              ).toUpperCase()
            )
          }
          title="Total Tax"
          change="Total tax collected"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 lg:col-span-2 p-4 rounded shadow min-h-[300px]">
          <RevenueChart />
        </div>
        <div className="p-4 rounded shadow min-h-[300px]">
          <CustomerActivityChart
            deposits={analytics?.analytics?.totalDeposit}
            withdrawals={analytics?.analytics?.totalWithdrawal}
          />
        </div>
      </div>

      {/* Invoice Table */}
      <InvoiceTable />
    </div>
  );
};

export default DashboardHome;
