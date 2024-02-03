import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import stockReducer from './stockSlice';
import {thunk} from 'redux-thunk';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
