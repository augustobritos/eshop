import { fetchStockRequest, fetchStockSuccess, fetchStockFailure } from '../stockSlice.js';
import { getProductsRequest, getProductByIdRequest } from '../../api/products.api.js';

// Thunk action creator for fetching stock data
export const fetchStock = () => async (dispatch) => {
  try {
    dispatch(fetchStockRequest());
    const response = await getProductsRequest();
    dispatch(fetchStockSuccess(response));
  } catch (error) {
    dispatch(fetchStockFailure(error.message));
  }
};

export const fetchProduct = async (id) => {
  try {
    const res = await getProductByIdRequest(id);
    return res;
  } catch (error) {
    // setErrors([error.response.data.message]);
    console.error(error.message);
  }
}