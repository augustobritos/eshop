import axios from "./axios";

export const updateProfileRequest = (user) => axios.put(`/updateProfile`, user);

export const getEnabledPaymentsRequest = () => axios.get("/payments/enabled");

export const updateEnabledPaymentsRequest = (payments) => axios.put("/payments/update", payments);
