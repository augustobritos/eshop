import axios from "./axios";

export const createProductRequest = (product) => axios.post("/products", product);

export const getProductsRequest = () => axios.get("/products");

export const getProductByIdRequest = (id) => axios.get(`/products/${id}`);

export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product);

export const deleteProductRequest = (id) => axios.delete(`/product/${id}`);

export const updateStockRequest = async (cart) =>{
    try {
        const response = await axios.put("/products/update/stock", cart);
        return response.data;
    } catch (error) {
        console.error("Error Actualizado el Stock:", error);
    throw error;
    }
}