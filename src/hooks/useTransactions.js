// import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   getUserTransactionService,
//   transactionsService,
// } from "../services/transactionsService";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export function useTransactions(page = 1, limit = 20) {
//   const {
//     data: apiResponse,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryFn: () => transactionsService(page, limit),
//     queryKey: ["transactions", page, limit],
//     onError: (err) => {
//       toast.error(err?.message ?? "Something went wrong fetching your history");
//     },
//   });

//   return {
//     transactions: apiResponse?.transactions || [],
//     pagination: {
//       currentPage: apiResponse?.page || page,
//       pageSize: apiResponse?.limit || limit,
//       total: apiResponse?.total || 0,
//       totalPages:
//         apiResponse?.totalPages || Math.ceil((apiResponse?.total || 0) / limit),
//       resultLength: apiResponse?.resultLength || 0,
//     },
//     isLoading,
//     error,
//     refetch,
//   };
// }
// export function useGetUserTransactions() {
//   const [searchResults, setSearchResults] = useState({
//     transactions: [],
//     pagination: {
//       current: 1,
//       pageSize: 20,
//       total: 0,
//     },
//   });

//   const {
//     mutate: getUserTransactions,
//     isPending: isLoading,
//     error,
//   } = useMutation({
//     mutationFn: ({ phone, page = 1, limit = 20 }) =>
//       getUserTransactionService(phone, page, limit),
//     onSuccess: (data) => {
//       setSearchResults({
//         transactions: data.transactions || [],
//         pagination: {
//           current: data.page || 1,
//           pageSize: data.limit || 20,
//           total: data.total || 0,
//         },
//       });
//     },
//     onError: (error) => {
//       toast.error(
//         error?.message ?? "Something went wrong fetching your history"
//       );
//       setSearchResults({
//         transactions: [],
//         pagination: {
//           current: 1,
//           pageSize: 20,
//           total: 0,
//         },
//       });
//     },
//   });

//   return {
//     getUserTransactions,
//     isLoading,
//     error,
//     ...searchResults,
//   };
// }
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserTransactionService,
  transactionsService,
} from "../services/transactionsService";
import toast from "react-hot-toast";
import { useState } from "react";

export function useTransactions(page = 1, limit = 20) {
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: () => transactionsService(page, limit),
    queryKey: ["transactions", page, limit],
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong fetching your history");
    },
  });

  return {
    transactions: apiResponse?.transactions || [],
    pagination: {
      currentPage: apiResponse?.page || page,
      pageSize: apiResponse?.limit || limit,
      total: apiResponse?.total || 0,
      totalPages:
        apiResponse?.totalPages || Math.ceil((apiResponse?.total || 0) / limit),
      resultLength: apiResponse?.resultLength || 0,
    },
    isLoading,
    error,
    refetch,
  };
}

export function useGetUserTransactions() {
  const {
    mutate: getUserTransactions,
    isPending: isLoading,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: ({ phone, page = 1, limit = 20 }) =>
      getUserTransactionService(phone, page, limit),
    onError: (error) => {
      toast.error(
        error?.message ?? "Something went wrong fetching your history"
      );
    },
  });

  return {
    getUserTransactions,
    isLoading,
    error,
    reset,
    searchResults: data?.transactions || [],
    searchPagination: {
      current: data?.page || 1,
      pageSize: data?.limit || 20,
      total: data?.total || 0,
    },
  };
}
