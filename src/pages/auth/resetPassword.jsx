import { Input, Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import MoveBack from "../../components/MoveBack";
import { useResetPassword } from "../../hooks/useResetPassword";

function ResetPassword() {
  const { resetPasswordAPI, isPending } = useResetPassword();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  const navigate = useNavigate();

  function submitData() {
    if (!otp || !newPassword || !phone) {
      toast.error("All fields are required");
      return;
    }
    const data = { otp, newPassword, phone };

    resetPasswordAPI(data, {
      onSuccess: (dt) => {
        if (dt?.success == true) {
          navigate("/login");
        }
      },
      onError: (err) => {},
    });
  }
  return (
    <div className="bg-bgBody min-h-screen w-full overflow-x-auto">
      <MoveBack />
      <div className="flex justify-between items-center flex-col bg-bgBody min-h-screen w-full overflow-x-auto">
        <div className="bg-bgheader rounded-lg mx-4  p-6">
          <p className="text-base font-bold text-textGrey">
            Enter new password
          </p>
          <div className="flex justify-start flex-col">
            <p className="mt-3">Enter Otp code</p>{" "}
            <div className="my-6">
              {" "}
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="phone"
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      textAlign: "center",
                      width: "50px",
                      height: "50px",
                      fontSize: "18px",
                      borderRadius: "10px",
                      border: "1px solid #ff7537",
                      margin: "0 3px",
                    }}
                  />
                )}
                containerStyle={{
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </div>
          </div>
          <Input
            placeholder="new password"
            className="border-black my-4"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            type="primar"
            style={{ backgroundColor: "#000", color: "#fff" }}
            className="bg-green-600 w-full mt-10 text-white"
            onClick={() => submitData()}
          >
            {isPending ? <Loader /> : "Reset password"}
          </Button>
        </div>
        <div className="md:px-4 px-4 py-4 mt-10"></div>
      </div>
    </div>
  );
}

export default ResetPassword;
