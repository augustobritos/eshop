import axios from "./axios";

export const saveOrderRequest = async (order) => {
  axios.post("/orders/save", order);
};

export const getOrdersRequest = async () => {
  return axios.get("/orders");
};

export const updateStatusRequest = async (id) => {
  try {
    const response = await axios.put(`orders/update/status/${id}`, id);
    return response; 
  } catch (error) {
    console.error("Error updating status:", error);
    throw error; 
  }
};

export const deleteOrderRequest = async (id) => {
  try {
    const response = await axios.delete(`/orders/delete/${id}`, id);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
