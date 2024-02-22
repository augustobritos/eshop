import axios from "./axios";

export const createPreferenceRequest = async (data) => {
    try {
        const response = await axios.post("/mp/preference/id", data);
        return response.data;
    } catch (error) {
        console.error("Error creando la preferencia:", error);
        throw error;
    }
}

export const getMercadoPagoKeyRequest = async () => {
    try {
        const response = await axios.get("/mp/key");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error creando la preferencia:", error);
        throw error;
    }
} 