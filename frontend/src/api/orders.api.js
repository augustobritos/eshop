import axios from "./axios";

export const saveOrderRequest = async (order) => {
  try {
    const response = await axios.post("/orders/save", order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersRequest = async () => {
  try {
    const response = await axios.get("/orders");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusRequest = async (id) => {
  try {
    const response = await axios.put(`orders/update/status/${id}`, id);
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const deleteOrderRequest = async (id) => {
  try {
    const response = await axios.delete(`/orders/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
