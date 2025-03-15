import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Could not load cart from localStorage", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingBook = state.find(book => book._id === action.payload._id);
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(book => book._id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const book = state.find(book => book._id === action.payload);
      if (book) book.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const book = state.find(book => book._id === action.payload);
      if (book && book.quantity > 1) {
        book.quantity -= 1;
      } else{
        return state.filter(book => book._id !== action.payload)
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
