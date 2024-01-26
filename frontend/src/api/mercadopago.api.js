import axios from "./axios";

export const createPreference = (cart) => axios.post("/mp/preference/id", cart);
