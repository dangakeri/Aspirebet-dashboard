import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/AuthServices";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const {
    mutate: forgotPasswordAPI,
    isPending,
    error,
  } = useMutation({
    mutationFn: (phone) => forgotPassword(phone),
    onSuccess: () => {
      toast.success("Forgot password OTP sent Successfull");
    },
    onError: (err) => {
      toast.error("Something went wrong, Please try again hahaha");
    },
  });

  return { forgotPasswordAPI, isPending, error };
}
