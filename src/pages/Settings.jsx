import { useState } from "react";
import {
  useTransferCash,
  useTransferSecondaryWallet,
} from "../hooks/useTransfer";
import AccountOverview from "../components/AccountsOverview";
import TaxPaymentsPanel from "../components/TaxPaymentsPanel";

const Settings = () => {
  // Transfer cash
  const [amount, setAmount] = useState(null);
  const [secondaryWalletAmount, setSecondaryWalletAmount] = useState(null);
  const { transferCashFn, isLoading } = useTransferCash();

  const {
    transferSecondaryWalletFn,
    isLoading: transferSecondaryWalletLoading,
  } = useTransferSecondaryWallet();

  function handletransferCash() {
    if (!amount) return;
    const data = { amount };
    transferCashFn(data, {
      onSuccess: (data) => {
        if (data) setAmount("");
      },
      onError: () => {
        setAmount("");
      },
    });
  }

  function handleTransferSecondaryWallet() {
    if (!secondaryWalletAmount) return;
    const data = { amount: secondaryWalletAmount };
    transferSecondaryWalletFn(data, {
      onSuccess: (data) => {
        if (data) setSecondaryWalletAmount("");
      },
      onError: () => {
        setSecondaryWalletAmount("");
      },
    });
  }

  return (
    <div className="lg:p-6 p-2 bg-gray-50 rounded-lg">
      <AccountOverview />
      <TaxPaymentsPanel />
      {/* Full-width Cash Withdrawal Section */}
      <div className="flex flex-wrap gap-6 mt-8">
        {/* First Card */}
        <div className="bg-white p-6 rounded-md shadow w-full md:w-[48%]">
          <h3 className="text-xl text-gray-600 font-semibold">
            Cash Transfer{" "}
            <span className="text-gray-400 text-sm font-normal">
              (Transfer the funds to be withdrawable (B2C))
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Amount
              </label>
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-2 w-[30rem] max-w-full text-gray-700 border border-gray-400 rounded"
                  placeholder="Enter amount"
                />
                <button
                  onClick={handletransferCash}
                  type="button"
                  className="p-2 text-white rounded !bg-green-600"
                >
                  {isLoading ? "Transferring" : "Transfer"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white p-6 rounded-md shadow w-full md:w-[48%]">
          <h3 className="text-xl text-gray-600 font-semibold">
            Wallet Transfer
            <span className="text-gray-400 text-sm font-normal">
              (secondary wallet (withdrawable) to user)
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-1">
                Amount
              </label>
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  value={secondaryWalletAmount}
                  onChange={(e) => setSecondaryWalletAmount(e.target.value)}
                  className="p-2 w-[30rem] max-w-full text-gray-700 border border-gray-400 rounded"
                  placeholder="Enter amount"
                />
                <button
                  onClick={handleTransferSecondaryWallet}
                  type="button"
                  className="p-2 text-white rounded !bg-green-600"
                >
                  {transferSecondaryWalletLoading ? "Transferring" : "Transfer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
