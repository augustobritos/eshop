import axios from "./axios";

export const createProductRequest = async (product) => {
  try {
    const response = await axios.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error Creando el Producto:", error);
    throw error;
  }
};

export const getProductsRequest = async () => {
  try {
    const response = await axios.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error Obteniendo los Productos:", error);
    throw error;
  }
};

export const getProductByIdRequest = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Obteniendo el Producto:", error);
    throw error;
  }
};

export const updateProductRequest = async (id, product) => {
  try {
    const response = await axios.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error Actualizado el Producto:", error);
    throw error;
  }
};

export const deleteProductRequest = async (id) => {
  try {
    const response = await axios.delete(`/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error Eliminando el Producto:", error);
    throw error;
  }
};

export const updateStockRequest = async (cart) => {
  try {
    const response = await axios.put("/products/update/stock", cart);
    return response.data;
  } catch (error) {
    console.error("Error Actualizado el Stock:", error);
    throw error;
  }
};
