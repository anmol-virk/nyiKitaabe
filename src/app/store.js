import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../pages/wishlistSlice';
import cartReducer from '../pages/cartSlice';
import { booksSlice } from "../pages/BookSlice"
import addressesReducer from "../pages/AddressSlice"

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    addresses: addressesReducer
  },
});

export default store;
