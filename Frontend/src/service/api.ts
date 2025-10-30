import axios from "axios";

const buildApiBase = () => {
  let base = (import.meta.env.VITE_API_URL ?? import.meta.env.VITE_SERVER_URL ?? "http://localhost:5000") as string;
  base = base.replace(/\/$/, "");
  if (!base.endsWith("/api")) {
    base = base + "/api";
  }
  return base;
};

const api = axios.create({
  baseURL: buildApiBase(),
});

export default api;
