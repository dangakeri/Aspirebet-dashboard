import { tenant_id } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";

export async function transferCash({ amount }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetchAPI(
      "wallet/make_transfer",
      "POST",
      {
        amount: amount,
        tenant_id,
      },
      token
    );

    return response;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}
export async function getSecondaryWallet() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }
  try {
    const response = await fetchAPI(
      `admin/getSecondaryWallet`,
      "GET",
      null,
      token
    );
    return response?.data;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}

export async function transferSecondaryWallet({ amount }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetchAPI(
      `admin/transferToSecondaryWallet`,
      "POST",
      {
        amount: +amount,
        tenant_id,
      },
      token
    );
    return response;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}
export async function getMmfBalances() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetchAPI(`wallet/mmf/balances`, "GET", null, token);
    return response;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}
