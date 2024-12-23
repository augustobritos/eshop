import { createContext, useContext, useState } from "react";
import {
  getProductByIdRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/products.api";

import {
  getSignedUrlRequest,
  uploadFileToSignedUrlRequest,
} from "../api/upload.api";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context) {
    return context;
  } else {
    throw new Error("useProducts must be used within an ProductsProvider");
  }
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const getProductById = async (id) => {
    try {
      const res = await getProductByIdRequest(id);
      return res;
    } catch (error) {
      setErrors([error.response.data.message]);
      console.error(error.message);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      setProducts([...products, product]);
      return res;
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await updateProductRequest(id, product);
      if (res) {
        return res;
      }
    } catch (error) {
      setErrors([error.response.data.message]);
      console.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      
      if (res && res.status === 204) {
        setProducts(products.filter((product) => product.id !== id));
        return res;
      }
    } catch (error) {
      setErrors([error.response.data.message]);
      console.error(error.message);
    }
  };

  const fileUpload = async (file) => {
    const content_type = file.type;
    const key = `products/${file.name}`;

    console.log("key:", key);
    console.log("content_type:", file.type);

    const response = await getSignedUrlRequest({ key, content_type });

    await uploadFileToSignedUrlRequest(
      response.data.signedUrl,
      file,
      content_type,
      null,
      () => {}
    );

    return response.data.fileLink;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        fileUpload,
        errors,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
