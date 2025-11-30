import { tenant_id as tenantId } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";

export async function BetsService(page = 1, limit = 20) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token) {
    throw new Error("User not logged in or token missing");
  }

  const token = user.token;

  try {
    const response = await fetchAPI(
      `analytics/getWinLosses?page=${page}&limit=${limit}`,
      "GET",
      null,
      token
    );

    if (!response.status) {
      throw new Error(response.message || "Failed to fetch bets data");
    }

    return response;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching bets"
    );
  }
}

export async function getWinLossesByPhone(phone, page = 1, limit = 10) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token) {
    throw new Error("User not logged in or token missing");
  }

  if (!phone) {
    throw new Error("Phone number is required for search");
  }

  const { token } = user;

  const data = { phone, page, limit, tenantId };

  try {
    const response = await fetchAPI(
      `analytics/getWinLossesByPhone`,
      "POST",
      data,
      token
    );

    if (!response.status) {
      throw new Error(response.message || "Failed to fetch bets");
    }
    return response;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching bets"
    );
  }
}
export async function exportBets(start, end) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!user?.token) {
    throw new Error("User not logged in or token missing");
  }
  // if (!start || !end) {
  //   throw new Error("Start and end dates are required");
  // }

  const url = `analytics/generateBets?start=${encodeURIComponent(
    start
  )}&end=${encodeURIComponent(end)}`;
  const response = await fetchAPI(url, "GET", null, user.token);

  if (!response?.downloadUrl) {
    throw new Error(response?.message || "No download URL returned");
  }
  return response;
}
