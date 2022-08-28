import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isLoading: true,
    product: null,
    pricing: null,
    error: '',
    id:0
}

export const fetchBook = createAsyncThunk('/modal/fetchBook', (id) => {
    const url = '/api/books/' + id;

    return axios.get(url)
        .then(resp => resp['data'])
        .catch(err => console.log(err))
})

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        open: (state, {payload})=>{

            state.id = payload
            state.isOpen = true
            console.log(payload);
        },
        close: (state) => {
            return initialState
        }
    },
    extraReducers: {
        [fetchBook.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isOpen =true
            if ('errorMessage' in payload) {
                state.error = payload.errorMessage
                return state
            }
            state.error = ''
            state.product = payload.product
            state.pricing = payload.pricing
            
        },
        [fetchBook.rejected]: (state) => {
            state.isLoading = false
            state.isOpen =true

            state.error = 'something went wrong'
        }, 
        [fetchBook.pending]: (state) => {
            state.isLoading = true
            state.isOpen =true

            state.error = ''
        } 
    }
})


export default modalSlice.reducer
export const {close} = modalSlice.actions