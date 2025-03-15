import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const pre_url = "https://bucherei-bts.vercel.app/addresses"

export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', async () => {
  const response = await axios.get(pre_url);
  return response.data.data.addresses;
});

export const addAddressAsync = createAsyncThunk('addresses/addAddress', async (newAddress) => {
  const response = await axios.post(pre_url, newAddress);
  return response.data;
});

export const updateAddressAsync = createAsyncThunk('addresses/updateAddress', async (updatedAddress) => {
  const response = await axios.put(`${pre_url}/${updatedAddress._id}`, updatedAddress);
  return response.data;
});

export const deleteAddressAsync = createAsyncThunk('addresses/deleteAddress', async (id) => {
  await axios.delete(`${pre_url}/${id}`);
  return id;
});

const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: [],
    selectedAddressId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        const index = state.addresses.findIndex((addr) => addr._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((addr) => addr._id !== action.payload);
      });
  },
});

export const { selectAddress } = addressSlice.actions;
export default addressSlice.reducer;
