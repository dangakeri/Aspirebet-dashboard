import { tenant_id } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";
const API_URL = import.meta.env.VITE_API_URL;

export async function transactionsService(page = 1, limit = 20) {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user || !user.token) {
  //   throw new Error("User not logged in or token missing");
  // }
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `wallet/getAllTransactions?page=${page}&limit=${limit}`,
      "GET",
      null,
      token
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUserTransactionService(phone, page = 1, limit = 20) {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user || !user.token) {
  //   throw new Error("User not logged in or token missing");
  // }

  // if (!phone) {
  //   throw new Error("Phone number is required for search");
  // }

  const { token } = user;

  const data = { phone, tenant_id };

  try {
    const response = await fetchAPI(
      `wallet/getUserTransactions?page=${page}&limit=${limit}`,
      "POST",
      data,
      token
    );

    if (!response.status) {
      throw new Error(response.message || "Failed to fetch transactions");
    }

    return response;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching transactions"
    );
  }
}
export async function exportTransactions(start, end) {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user?.token) {
  //   throw new Error("User not logged in or token missing");
  // }
  // if (!start || !end) {
  //   throw new Error("Start and end dates are required");
  // }

  const url = `analytics/generateTransaction?start=${encodeURIComponent(
    start
  )}&end=${encodeURIComponent(end)}`;
  const response = await fetchAPI(url, "GET", null, user.token);

  if (!response?.downloadUrl) {
    throw new Error(response?.message || "No download URL returned");
  }
  return response;
}
