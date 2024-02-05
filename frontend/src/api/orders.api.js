import axios from "./axios";

export const saveOrderRequest = async (order) => {
    axios.post("/orders/save", order);
}

export const getOrdersRequest = async () => {
    return axios.get("/orders");
}

export const updateStatusRequest = async (id) => {
    axios.put(`orders/update/status/${id}`, id);
}

export const deleteOrderRequest = async (id) => {
    axios.delete(`/orders/delete/${id}`, id);
}