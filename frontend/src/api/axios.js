import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const url = axios.create({
  baseURL,
  withCredentials: true,
});

export default url;
