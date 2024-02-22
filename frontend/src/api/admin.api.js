import axios from "./axios";

export const signUpRequest = async (data) => {
  try {
    const response = await axios.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
};

export const signInRequest = async (data) => {
  try {
    const response = await axios.post("/signin", data);
    return response.data;
  } catch (error) {
    console.error("Error iniciando sesion:", error);
    throw error;
  }
};

export const signOutRequest = async () => {
  try {
    const response = await axios.post("/signout");
    return response;
  } catch (error) {
    console.error("Error cerrando sesion:", error);
    throw error;
  }
};

export const updateProfileRequest = async (user) => {
  try {
    const response = await axios.put(`/updateProfile`, user);
    return response.data;
  } catch (error) {
    console.error("Error Actualizado el Perfil:", error);
    throw error;
  }
};

export const getEnabledPaymentsRequest = async () => {
  try {
    const response = await axios.get("/payments/enabled");
    return response.data;
  } catch (error) {
    console.error("Error Obteniendo los tipos de pagos:", error);
    throw error;
  }
};
export const updateEnabledPaymentsRequest = async (payments) => {
  try {
    const response = await axios.put("/payments/update", payments);
    return response.data;
  } catch (error) {
    console.error("Error Actualizado los tipos de pagos:", error);
    throw error;
  }
};
