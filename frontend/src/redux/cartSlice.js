import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      
      const existingItemIndex = state.items.findIndex(item => item.id === id);
    
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity < quantity) {
          existingItem.quantity += 1;
        } else {
          console.log("Not enough stock available");
        }
      } else {
        console.log("Item does not exist in the cart");
        if (quantity > 0) {
          state.items.push({ ...action.payload, quantity: 1 });
        } else {
          console.log("Not enough stock available");
        }
      }
    },
    removeUnitFromCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id, quantity);
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          console.log("Cannot remove more units. Quantity is already zero.");
          // Consider handling scenario where quantity is already zero
        }
      } else {
        console.log("Item not found in the cart");
        // Consider handling scenario where item is not found
      }
    },    
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      console.log(quantity);
      if (itemToUpdate.quantity > quantity) {
          itemToUpdate.quantity = quantity;
        } else {
          console.log("Not enough stock available");
        }
    },
  },
});

export const { addToCart, removeUnitFromCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
