import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/AuthServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logInFn, isPending: isLoading } = useMutation({
    mutationFn: ({ phone, password }) => login({ phone, password }),
    onSuccess: (user) => {
      if (!user || !user.user) return;

      localStorage.setItem("user", JSON.stringify(user?.user));
      queryClient.setQueryData(["user"], user?.user);
      toast.success("Log in Successful");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      // toast.error("Provided phone or password is incorrect");
      toast.error(error?.message);
    },
  });
  return { logInFn, isLoading };
}
