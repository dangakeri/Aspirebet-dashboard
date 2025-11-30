import { tenant_id } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";

export async function userServices(page = 1, limit = 20) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    throw new Error("User not logged in or token missing");
  }
  const token = user?.token;
  try {
    const res = await fetchAPI(
      `user/getAllUsers?page=${page}&limit=${limit}`,
      "GET",
      null,
      token
    );
    if (!res.status) {
      throw new Error(res.message || "Failed to fetch users data");
    }

    return res;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching bets"
    );
  }
}
export async function getUserByPhone(phone) {
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
    const response = await fetchAPI(`user/getUserByPhone`, "POST", data, token);

    if (!response.status) {
      throw new Error(response.message || "Failed to fetch users");
    }

    return response;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching users"
    );
  }
}
export async function exportUsers(start, end) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.token) {
    throw new Error("User not logged in or token missing");
  }
  if (!start || !end) {
    throw new Error("Start and end dates are required");
  }

  const url = `analytics/generateUserDocument?start=${encodeURIComponent(
    start
  )}&end=${encodeURIComponent(end)}`;
  const response = await fetchAPI(url, "GET", null, user.token);

  if (!response?.downloadUrl) {
    throw new Error(response?.message || "No download URL returned");
  }
  return response;
}
