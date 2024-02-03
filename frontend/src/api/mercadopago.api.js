import axios from "./axios";

export const createPreferenceRequest = (cart) => axios.post("/mp/preference/id", cart);

export const getMercadoPagoKeyRequest = () => axios.get("/mp/key");