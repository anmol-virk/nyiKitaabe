import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PREFIX_URL = "https://bucherei-bts.vercel.app/books"

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async () => {
        const response = await axios.get(PREFIX_URL)
        console.log("API Response:", response.data.data.books)
        return response.data.data.books
    }
)

export const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBooks.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "success"
            state.books = action.payload
        })
        .addCase(fetchBooks.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message 
        })
    }
})

export default booksSlice.reducer