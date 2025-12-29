import axios from "axios";

const api = axios.create({
  baseURL: "https://frostfault-api-chaos-simulator-sujk.vercel.app",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
