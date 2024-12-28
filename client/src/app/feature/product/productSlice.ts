import { createSlice } from "@reduxjs/toolkit";
import product from '../../../data/product.json';


const productSlice = createSlice({

    name: "productslice",
    initialState: {
        loading: false,
        error: null,
        products: product
    },
    reducers: {
        createProductPending: (state) => {
            state.loading = true
        },
        createProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        createProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const { createProductFailure, createProductPending, createProductSuccess } = productSlice.actions;