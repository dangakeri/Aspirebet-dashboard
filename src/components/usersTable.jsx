import { useState } from "react";
import {
  Table,
  Modal,
  Button,
  Spin,
  Alert,
  DatePicker,
  Input,
  Tooltip,
} from "antd";
import { FiDownload, FiSearch } from "react-icons/fi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import DeletionModal from "./DeletionModal";
import { useGetUsers } from "../hooks/useGetUsers";
import ModalView from "./ModalView";
import MyDrawer from "./Drawer";
import { useGetUserByPhone } from "../hooks/useGetUserByPhone";
import UsersExportModal from "./Modals/user/UsersExportModal";
import UsersFilterModal from "./Modals/user/UsersFilterModal";
import { useFormatCurrency } from "../hooks/useFormatCurrency";

const { RangePicker } = DatePicker;

function UsersTable() {
  const [exportVisible, setExportVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchPhone, setSearchPhone] = useState("");

  const { formatCurrency } = useFormatCurrency();
  const {
    users,
    pagination: apiPagination,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetUsers(currentPage, pageSize);

  const { searchUser, isSearching, searchError, searchResults, resetSearch } =
    useGetUserByPhone();

  const [filters, setFilters] = useState({
    status: null,
    dateRange: null,
    accountStatus: null,
  });

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-600",
      blocked: "bg-red-100 text-red-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status] || "bg-gray-100"
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A"}
      </span>
    );
  };

  const handleSearch = (e) => {
    const phone = e.target.value;
    setSearchPhone(phone);

    if (!phone.trim()) {
      resetSearch();
      return;
    }
    if (phone.length >= 4) searchUser({ phone });
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    refetch();
  };

  const filteredUsers = users?.filter((user) => {
    if (filters.status && user.status !== filters.status) return false;
    if (filters.accountStatus && user.accountStatus !== filters.accountStatus)
      return false;
    if (filters.dateRange && filters.dateRange.length === 2) {
      const userDate = new Date(user.createdAt);
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);
      if (userDate < startDate || userDate > endDate) return false;
    }
    return true;
  });

  const displayedUsers = searchResults || filteredUsers;

  const columns = [
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "N/A",
    },
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id || "N/A",
    },
    {
      title: "Balance (KES)",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => (
        <span className={balance > 1000 ? "text-green-600" : ""}>
          {balance ? formatCurrency(balance) : formatCurrency("0")}
        </span>
      ),
    },
    {
      title: "Account Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, user) => (
        <Button
          onClick={() => {
            setSelectedUser(user);
            showDrawer();
          }}
          style={{ backgroundColor: "#00ff7f", color: "#000" }}
        >
          Manage
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <Alert
          message="Error loading users"
          description={error.message}
          type="error"
          showIcon
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {showDeleteModal && (
        <DeletionModal
          cancelDelete={() => setShowDeleteModal(false)}
          confirmDelete={() => setShowDeleteModal(false)}
          id={userToDelete?.id}
          phone={userToDelete?.phone}
        />
      )}

      {/* Header with responsive controls */}
      <div className="lg:px-4 py-3 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h3 className="text-lg font-semibold text-gray-800">User Management</h3>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-64">
            <Input
              prefix={<FiSearch className="text-gray-400" />}
              placeholder="Search by phone number"
              value={searchPhone}
              onChange={handleSearch}
              allowClear
              suffix={isSearching ? <Spin size="small" /> : null}
            />
            {searchError && (
              <Tooltip title={searchError.message}>
                <ExclamationCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            )}
          </div>

          <Button onClick={() => setIsFilterModalVisible(true)}>
            Filter Users
          </Button>

          <Button icon={<FiDownload />} onClick={() => setExportVisible(true)}>
            Export
          </Button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <Spin
          spinning={isFetching || isSearching}
          tip="Loading..."
          size="large"
        >
          <Table
            columns={columns}
            dataSource={displayedUsers?.map((user) => ({
              ...user,
              balance: user?.wallet?.balance,
              key: user._id,
            }))}
            onChange={handleTableChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: searchResults ? searchResults.length : apiPagination.total,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} users`,
            }}
            scroll={{ x: "max-content" }}
            locale={{
              emptyText:
                searchResults?.length === 0
                  ? "No users found matching your search"
                  : "No users found",
            }}
          />
        </Spin>
      </div>

      <MyDrawer open={open} onClose={onClose} user={selectedUser} />

      <UsersFilterModal
        open={isFilterModalVisible}
        onOk={() => setIsFilterModalVisible(false)}
        onCancel={() => setIsFilterModalVisible(false)}
        onReset={() =>
          setFilters({ status: null, dateRange: null, accountStatus: null })
        }
        filters={filters}
        onAccountStatusChange={(value) =>
          setFilters((prev) => ({ ...prev, accountStatus: value }))
        }
        onDateChange={(dates) =>
          setFilters((prev) => ({ ...prev, dateRange: dates }))
        }
      />

      <UsersExportModal
        open={exportVisible}
        onCancel={() => setExportVisible(false)}
        filters={filters}
      />

      <Modal
        title={currentAction?.label}
        open={currentAction !== null}
        onOk={() => {}}
        onCancel={() => setCurrentAction(null)}
      >
        <ModalView actionKey={currentAction?.key} />
      </Modal>
    </div>
  );
}

export default UsersTable;
