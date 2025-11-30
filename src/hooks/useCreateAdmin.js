import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "../services/AuthServices";
import { message } from "antd";
import toast from "react-hot-toast";

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  const { mutate: createAdminFn, isPending: isLoading } = useMutation({
    mutationFn: ({ phone, password }) => createAdmin({ phone, password }),
    onSuccess: (user) => {
      if (!user?.user) {
        message.error("Failed to create admin");
        return;
      }

      queryClient.setQueryData(["admin"], user?.user);

      toast.success("Admin created successfully");
    },
    onError: (err) => {
      console.error("Admin creation error:", err);
      toast.error(err.message || "Failed to create admin. Please try again.");
    },
  });

  return { createAdminFn, isLoading };
}
