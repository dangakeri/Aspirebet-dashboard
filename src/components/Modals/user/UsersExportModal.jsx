import { useState } from "react";
import { Modal, Button, Spin, DatePicker } from "antd";
import { useExportUsers } from "../../../hooks/useExportUsers";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

const UsersExportModal = ({ open, onCancel }) => {
  const [dateRange, setDateRange] = useState([]);
  const { exportMutation, isLoading } = useExportUsers();

  const triggerDownload = (downloadUrl) => {
    if (!downloadUrl) return;
    const fileUrl = downloadUrl;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "users.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (!dateRange || dateRange.length !== 2) {
      return toast.error("Please select a date range.");
    }

    const start = dateRange[0].format("YYYY-MM-DD");
    const end = dateRange[1].format("YYYY-MM-DD");

    exportMutation(
      { start, end },
      {
        onSuccess: (data) => {
          triggerDownload(`https://api.gongamali.bet${data?.downloadUrl}`);
          onCancel();
        },
      }
    );
  };

  return (
    <Modal
      title="Export Users"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>,
        <Button
          key="export"
          type="primary"
          loading={isLoading}
          onClick={handleExport}
          disabled={!dateRange || dateRange.length !== 2 || isLoading}
        >
          Export
        </Button>,
      ]}
    >
      <p>Select the date range for the user data export:</p>
      <RangePicker
        style={{ width: "100%" }}
        onChange={(dates) => setDateRange(dates)}
        disabled={isLoading}
      />

      {isLoading && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Spin tip="Generating export..." />
        </div>
      )}
    </Modal>
  );
};

export default UsersExportModal;
