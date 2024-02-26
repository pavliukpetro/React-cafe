import {configureStore} from '@reduxjs/toolkit';
import { cartSlice } from './slices/cartSlice';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
        
//     },
//     reducers: {
        
//     }
// });

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    }
});

export const cartActions = cartSlice.actions;

export default store;
