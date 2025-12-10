import { fetchAPI } from "../utils/fetchRequest";
// Analytic services
export async function analyticsServices({ startDate, endDate }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await fetchAPI(
      `analytics/getAnalytics?startDate=${startDate}&endDate=${endDate}`,
      "GET",
      null,
      token
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getMonthlyAnalytics() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const res = await fetchAPI(
      `analytics/getMonthlyAnalytics`,
      "GET",
      null,
      token
    );
    return res?.data;
  } catch (error) {
    throw new Error(error);
  }
}
