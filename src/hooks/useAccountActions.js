// src/hooks/useAccountActions.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  pauseAccount,
  activateAccount,
  pauseWithdrawal,
  activateWithdrawal,
  pauseDeposit,
  activateDeposit,
} from "../services/UsersActions";
import toast from "react-hot-toast";

const useAccountActions = () => {
  const queryClient = useQueryClient();

  // Account Activation/Pause
  const { mutate: pauseAccountFn, isPending: isPausingAccount } = useMutation({
    mutationFn: pauseAccount,
    onSuccess: () => {
      toast.success("Account paused successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => toast.error(err.message || "Failed to pause account"),
  });

  const { mutate: activateAccountFn, isPending: isActivatingAccount } =
    useMutation({
      mutationFn: activateAccount,
      onSuccess: () => {
        toast.success("Account activated successfully");
        queryClient.invalidateQueries(["activateuser"]);
      },
      onError: (err) =>
        toast.error(err.message || "Failed to activate account"),
    });

  // Withdrawal Activation/Pause
  const { mutate: pauseWithdrawalFn, isPending: isPausingWithdrawal } =
    useMutation({
      mutationFn: pauseWithdrawal,
      onSuccess: () => {
        toast.success("Withdrawal paused successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err) =>
        toast.error(err.message || "Failed to pause withdrawal"),
    });

  const { mutate: activateWithdrawalFn, isPending: isActivatingWithdrawal } =
    useMutation({
      mutationFn: activateWithdrawal,
      onSuccess: (data) => {
        toast.success("Withdrawal activated successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err) =>
        toast.error(err.message || "Failed to activate withdrawal"),
    });

  // Deposit Activation/Pause
  const { mutate: pauseDepositFn, isPending: isPausingDeposit } = useMutation({
    mutationFn: pauseDeposit,
    onSuccess: () => {
      toast.success("Deposit paused successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => toast.error(err.message || "Failed to pause deposit"),
  });

  const { mutate: activateDepositFn, isPending: isActivatingDeposit } =
    useMutation({
      mutationFn: activateDeposit,
      onSuccess: () => {
        toast.success("Deposit activated successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err) =>
        toast.error(err.message || "Failed to activate deposit"),
    });

  return {
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
  };
};

export default useAccountActions;
