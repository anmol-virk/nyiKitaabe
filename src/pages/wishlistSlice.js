import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem("wishlist");
    return serializedWishlist ? JSON.parse(serializedWishlist) : [];
  } catch (error) {
    console.error("Could not load wishlist from localStorage", error);
    return [];
  }
};
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadFromLocalStorage(),
  reducers: {
    addToWishlist: (state, action) => {
        state.push(action.payload);
      
    },
    removeFromWishlist: (state, action) => {
      return state.filter(book => book._id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
