import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
    cart: [],
    item: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction) => {
            state.cart.push(action.payload);
        }
    }
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;