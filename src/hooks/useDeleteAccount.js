import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../services/UsersActions";

export function useDeleteAccount() {
  const { mutate: deleteAccountFn, isPending: isLoading } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account Deleted successfully");

      localStorage.clear();
    },
    onError: (err) => {
      toast.error("Your acccount could not be deleted");
    },
  });
  return { deleteAccountFn, isLoading };
}
