import axios from "axios";

const core = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json;",
  },
});
core.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message?.toLowerCase().includes("token expired")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default core;
