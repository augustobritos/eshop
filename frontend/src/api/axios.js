import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "https://southamerica-east1-eshop-412313.cloudfunctions.net/myShop/api";

const url = axios.create({
  baseURL,
  withCredentials: true,
});

export default url;
