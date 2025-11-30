import { tenant_id } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";

export async function pauseAccount(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/pauseAccount/${id}`,
      "POST",
      { tenant_id },
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function activateAccount(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/activateAccount/${id}`,
      "POST",
      { tenant_id },
      token
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function pauseWithdrawal(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/pauseWithdrawal/${id}`,
      "POST",
      { tenant_id },
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function activateWithdrawal(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/activateWithdrawal/${id}`,
      "POST",
      { tenant_id },
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function pauseDeposit(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/pauseDeposit/${id}`,
      "POST",
      { tenant_id },
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function activateDeposit(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `admin/activateDeposit/${id}`,
      "POST",
      { tenant_id },
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

// Delete Account
export async function deleteAccount(userID) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const data = { userID, tenant_id };
  try {
    if (!token) {
      throw new Error("Something went wrong");
    }
    const response = await fetchAPI(
      "admin/deleteAccount",
      "DELETE",
      data,
      token
    );

    return response;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}
