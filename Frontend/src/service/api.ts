import axios from "axios";

const buildApiBase = () => {
  // Prefer explicit VITE_API_URL (should be set in Frontend/.env for deployments)
  let base = (import.meta.env.VITE_API_URL ?? import.meta.env.VITE_SERVER_URL) as string | undefined;

  if (!base) {
    // No env var provided — fall back to same origin + /api and warn the developer
    console.warn(
      "VITE_API_URL is not set. Falling back to the current origin + /api. Set VITE_API_URL in your .env to point to the backend."
    );
    base = `${window.location.origin}/api`;
    // base already includes /api so we can return it directly
    return base.replace(/\/$/, "");
  }

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