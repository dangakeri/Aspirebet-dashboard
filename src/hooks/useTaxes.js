import { useMutation } from "@tanstack/react-query";
import { excisePayment, withholdingPayment } from "../services/TaxServices";

export function useExciseTax() {
  const { mutate: payExcise, isPending: isLoading } = useMutation({
    mutationFn: excisePayment,
  });
  return { payExcise, isLoading };
}

export function useWithholdingTax() {
  const { mutate: payWithholding, isPending: isLoading } = useMutation({
    mutationFn: withholdingPayment,
  });
  return { payWithholding, isLoading };
}
