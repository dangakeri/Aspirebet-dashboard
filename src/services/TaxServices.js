import { tenant_id } from "../utils/ApiConfigs";
import { fetchAPI } from "../utils/fetchRequest";

export async function excisePayment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `tax/b2bExcisePayment`,
      "POST",
      { tenant_id },
      token
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function withholdingPayment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `tax/b2bWithHoldingPayment`,
      "POST",
      { tenant_id },
      token
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
}
