import { tenant_id as tenantId } from "../utils/ApiConfigs";
import { headers } from "../utils/apiRequest";
import { fetchAPI } from "../utils/fetchRequest";

const API_URL = import.meta.env.VITE_API_URL;

export async function login({ phone, password }) {
  try {
    const response = await fetchAPI("user/admin-login", "POST", {
      phone: phone,
      password: password,
      tenantId,
    });

    return response;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}

export async function register({ phone, password }) {
  try {
    const response = await fetch(`${API_URL}/user/create-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, password: password, tenantId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(data?.message || "Something went wrong");
  }
}
export async function forgotPassword(phone) {
  try {
    const response = await fetch(`${API_URL}/user/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
}
export async function resetPassword({ phone, newPassword, otp }) {
  try {
    const response = await fetch(`${API_URL}/user/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        newPassword: newPassword,
        otp: otp,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
}

export async function createAdmin({ phone, password }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await fetchAPI(
      "user/createAdmin",
      "POST",
      {
        phone: phone,
        password: password,
      },
      token
    );

    return response;
  } catch (error) {
    throw new Error(data?.message || "Something went wrong");
  }
}
export async function deleteAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await fetchAPI(
      "user/delete-account",
      "DELETE",
      null,
      token
    );

    return response;
  } catch (error) {
    throw new Error(data?.message || "Something went wrong");
  }
}
