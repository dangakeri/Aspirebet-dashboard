import { Button, Collapse, Input, Switch } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import useAccountActions from "../hooks/useAccountActions";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteAccountModal";

const { Panel } = Collapse;

function MyDrawer({ open, onClose, user }) {
  const [depositPhone, setDepositPhone] = useState("");
  const [withdrawalPhone, setWithdrawalPhone] = useState("");
  const [depositTransactionCode, setDepositTransactionCode] = useState("");
  const [withdrawalTransactionCode, setWithdrawalTransactionCode] =
    useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }
  function handleOk() {
    setIsModalOpen(false);
  }
  function handleCancel() {
    setIsModalOpen(false);
  }
  const {
    pauseAccountFn,
    activateAccountFn,
    pauseWithdrawalFn,
    activateWithdrawalFn,
    pauseDepositFn,
    activateDepositFn,
    isPausingAccount,
    isActivatingAccount,
    isPausingWithdrawal,
    isActivatingWithdrawal,
    isPausingDeposit,
    isActivatingDeposit,
  } = useAccountActions();

  const handlePauseWithdrawal = async (checked) => {
    if (!user?._id) return;
    try {
      if (checked) {
        await pauseWithdrawalFn(user?._id);
      } else {
        await activateWithdrawalFn(user?._id);
      }
      onClose();
    } catch (error) {
      // Error handled in the hook
    }
  };

  const handlePauseDeposit = async (checked) => {
    if (!user?._id) return;
    try {
      if (checked) {
        await pauseDepositFn(user?._id);
      } else {
        await activateDepositFn(user?._id);
      }
    } catch (error) {
      // Error handled in the hook
    }
    onClose();
  };
  const handlePauseAccount = async (checked) => {
    if (!user?._id) {
      toast.error("No user selected");
      return;
    }

    try {
      if (!checked) {
        pauseAccountFn(user?._id);
      } else {
        activateAccountFn(user?._id);
      }
    } catch (error) {
      console.error("Account toggle error:", error);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">User Management</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            <CloseOutlined />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* Manual Deposit Section */}
          {/* <Collapse bordered={false} defaultActiveKey={["0"]}>
            <Panel header="Manual Deposit" key="1" className="text-left">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  placeholder="0712 345 678"
                  value={depositPhone}
                  onChange={(e) => setDepositPhone(e.target.value)}
                  required
                />
                <label className="text-sm font-medium text-gray-700">
                  Transaction Code
                </label>
                <Input
                  placeholder="TCN3E1ZC7"
                  value={depositTransactionCode}
                  onChange={(e) => setDepositTransactionCode(e.target.value)}
                  required
                />
                <div className="flex justify-end gap-3 mt-2">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#16A34A" }}
                    onClick={() => console.log("Manual deposit confirmed")}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Panel>
          </Collapse> */}

          {/* Manual Withdrawal Section */}
          {/* <Collapse bordered={false} className="my-6">
            <Panel header="Manual Withdrawal" key="2" className="text-left">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  placeholder="0712 345 678"
                  value={withdrawalPhone}
                  onChange={(e) => setWithdrawalPhone(e.target.value)}
                  required
                />
                <label className="text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Input
                  placeholder="ksh 1,200"
                  value={withdrawalTransactionCode}
                  onChange={(e) => setWithdrawalTransactionCode(e.target.value)}
                  required
                />
                <div className="flex justify-end gap-3 mt-2">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#16A34A" }}
                    onClick={() => console.log("Manual withdrawal confirmed")}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Panel>
          </Collapse> */}

          {/* Account Controls Section */}
          <div className="mt-8">
            <h3 className="text-md font-medium mb-4">Account Controls</h3>

            {/* Pause Withdrawal */}
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-700">Pause Withdrawal</span>
              <Switch
                checked={user?.withdrawalStatus === "banned"}
                onChange={handlePauseWithdrawal}
                loading={isPausingWithdrawal || isActivatingWithdrawal}
                className="custom-switch"
              />
            </div>

            {/* Pause Deposit */}
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-700">Pause Deposit</span>
              <Switch
                checked={user?.depositStatus === "banned"}
                onChange={handlePauseDeposit}
                loading={isPausingDeposit || isActivatingDeposit}
                className="custom-switch"
              />
            </div>

            {/* Pause/Activate Account */}
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-700">Pause/Activate Account</span>
              <Switch
                checked={user?.accountStatus === "active"} // true = paused, false = active
                onChange={handlePauseAccount}
                loading={isPausingAccount || isActivatingAccount}
                className="custom-switch"
              />
            </div>

            {/* Delete Account */}
            <div className="flex justify-between items-center py-3">
              {" "}
              <p className="text-gray-700 cursor-pointer" onClick={showModal}>
                Delete Account
              </p>
              <DeleteModal
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                userID={user?._id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDrawer;
