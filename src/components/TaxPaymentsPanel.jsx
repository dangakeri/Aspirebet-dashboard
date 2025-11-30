import { Button, Tooltip, Popconfirm } from "antd";
import { FiPercent } from "react-icons/fi";
import { HiOutlineReceiptTax } from "react-icons/hi";
import toast from "react-hot-toast";
import { useExciseTax, useWithholdingTax } from "../hooks/useTaxes";

export default function TaxPaymentsPanel({ className = "" }) {
  const { payExcise, isLoading: exciseLoading } = useExciseTax();
  const { payWithholding, isLoading: withholdingLoading } = useWithholdingTax();
  const anyLoading = exciseLoading || withholdingLoading;

  const handleExcise = () => {
    payExcise(undefined, {
      onSuccess: (res) => {
        // { status: true, message: "Accept the service request successfully." }
        const msg = res?.message || "Excise payment request sent.";
        res?.status ? toast.success(msg) : toast.error(msg);
      },
      onError: (err) => {
        toast.error(err?.message || "Excise payment failed.");
      },
    });
  };

  const handleWithholding = () => {
    payWithholding(undefined, {
      onSuccess: (res) => {
        // { status: true, message: "No withdrawals for the specified duration..." }
        const msg = res?.message || "Withholding payment processed.";
        res?.status ? toast.success(msg) : toast.error(msg);
      },
      onError: (err) => {
        toast.error(err?.message || "Withholding payment failed.");
      },
    });
  };

  return (
    <section className={`w-full my-6 ${className}`} aria-label="Tax payments">
      <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm px-4 sm:px-6 py-4 sm:py-5">
        {/* Responsive wrapper */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title */}
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Taxes
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Trigger automated B2B payments for Excise and Withholding.
            </p>
          </div>

          {/* Actions: stack on mobile, inline on md+ */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-3">
            <Tooltip title="Initiate Excise B2B payment">
              <Popconfirm
                title="Pay Excise Tax?"
                description="This will initiate an Excise B2B payment."
                okText="Yes, Pay"
                cancelText="Cancel"
                onConfirm={handleExcise}
                disabled={anyLoading}
              >
                <Button
                  type="primary"
                  size="large"
                  loading={exciseLoading}
                  disabled={anyLoading}
                  block
                  className="md:w-auto !bg-gradient-to-r !from-[#f97316] !to-[#fb923c] !border-none !shadow-md hover:!shadow-lg"
                  icon={<FiPercent size={18} />}
                >
                  Pay Excise
                </Button>
              </Popconfirm>
            </Tooltip>

            <Tooltip title="Initiate Withholding B2B payment">
              <Popconfirm
                title="Pay Withholding Tax?"
                description="This will initiate a Withholding B2B payment for eligible withdrawals."
                okText="Yes, Pay"
                cancelText="Cancel"
                onConfirm={handleWithholding}
                disabled={anyLoading}
              >
                <Button
                  size="large"
                  loading={withholdingLoading}
                  disabled={anyLoading}
                  block
                  className="md:w-auto !bg-gradient-to-r !from-[#0ea5e9] !to-[#22d3ee] !text-white !border-none !shadow-md hover:!shadow-lg"
                  icon={<HiOutlineReceiptTax size={18} />}
                >
                  Pay Withholding
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}
