import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBooks = createAsyncThunk('/books/getBooks', (page = 1) => {
    const url = '/api/books?page=' + page;
    return axios.get(url )
        .then(resp => resp['data'])
        .catch(err => console.log(err))
})

const initialState = {
    isLoading: true,
    products: [],
    current_page: 1,
    last_page: 0,
}

const booksSlice = createSlice({
    name: 'books',
    initialState,

    extraReducers: {
        [fetchBooks.pending]: (state) => {
            state.isLoading = true
        },
        [fetchBooks.fulfilled]: (state, {payload}) => {
            console.log(payload);
            state.isLoading = false;
            state.products = payload.products;
            state.current_page = payload.current_page
            state.last_page = payload.last_page
        },
        [fetchBooks.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})


export default booksSlice.reducer

