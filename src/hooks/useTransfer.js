import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMmfBalances,
  getSecondaryWallet,
  transferCash,
  transferSecondaryWallet,
} from "../services/paymentService";
import toast from "react-hot-toast";

export function useTransferCash() {
  const queryClient = useQueryClient();
  const {
    mutate: transferCashFn,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (amount) => transferCash(amount),
    onSuccess: (amount) => {
      if (!amount) return;
      queryClient.setQueryData(["amount"], amount?.amount);
      toast.success("Transfer made successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong, Try again");
    },
  });

  return { transferCashFn, isLoading, error };
}

export function useTransferSecondaryWallet() {
  const queryClient = useQueryClient();
  const {
    mutate: transferSecondaryWalletFn,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (amount) => transferSecondaryWallet(amount),
    onSuccess: (amount) => {
      if (!amount) return;
      queryClient.setQueryData(["secondaryWallet"], amount?.amount);
      toast.success("Transfer made successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong, Try again");
    },
  });
  return { transferSecondaryWalletFn, isLoading, error };
}
export function useGetMmfbalances() {
  const {
    data: mmfBalances,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: getMmfBalances,
    queryKey: ["mmfBalances"],
    onError: (error) => {
      toast.error(
        error?.message ?? "Something went wrong fetching mmf balance"
      );
    },
  });
  return { mmfBalances, isLoading, error, refetch };
}
export function useGetSecondaryWallet() {
  const {
    data: secondaryWalletBalance,
    isPending: isLoading,
    error,
  } = useQuery({
    queryFn: getSecondaryWallet,
    queryKey: ["secondaryWallet"],
    onError: (error) => {
      toast.error(
        error?.message ??
          "Something went wrong fetching secondary wallet balance"
      );
    },
  });
  return { secondaryWalletBalance, isLoading, error };
}
