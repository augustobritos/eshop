import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stock: [],
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    fetchStockRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStockSuccess(state, action) {
      state.loading = false;
      state.stock = action.payload;
    },
    fetchStockFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStockRequest, fetchStockSuccess, fetchStockFailure } = stockSlice.actions;

export default stockSlice.reducer;
