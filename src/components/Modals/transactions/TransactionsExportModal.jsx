import { useState } from "react";
import { Modal, Button, Spin, DatePicker } from "antd";
import { useExportTransactions } from "../../../hooks/useExportTransactions";

const { RangePicker } = DatePicker;

function TransactionsExportModal({ open, onCancel }) {
  const [dateRange, setDateRange] = useState([]);
  const exportMutation = useExportTransactions();

  const triggerDownload = (downloadUrl) => {
    if (!downloadUrl) return;

    // If API returns a relative path, prefix your backend host:
    const fileUrl = `https://api.gongamali.bet${downloadUrl}`;

    // If CORS blocks attribute download, fallback to window.open
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "transactions.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (!dateRange || dateRange.length !== 2) {
      return Modal.warning({ title: "Select a date range first." });
    }
    const start = dateRange[0].format("YYYY-MM-DD");
    const end = dateRange[1].format("YYYY-MM-DD");

    exportMutation.mutate(
      { start, end },
      {
        onSuccess: (data) => {
          triggerDownload(data?.downloadUrl);
          onCancel();
        },
      }
    );
  };

  return (
    <Modal
      title="Export Transactions"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          disabled={exportMutation.isLoading}
        >
          Cancel
        </Button>,
        <Button
          key="export"
          type="primary"
          loading={exportMutation.isLoading}
          onClick={handleExport}
          disabled={
            !dateRange || dateRange.length !== 2 || exportMutation.isLoading
          }
        >
          Export
        </Button>,
      ]}
    >
      <p>Select the date range for the transactions export:</p>
      <RangePicker
        style={{ width: "100%" }}
        onChange={(dates) => setDateRange(dates)}
        disabled={exportMutation.isLoading}
      />
      {exportMutation.isLoading && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Spin tip="Generating export..." />
        </div>
      )}
    </Modal>
  );
}

export default TransactionsExportModal;
