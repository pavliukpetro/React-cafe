import {configureStore} from '@reduxjs/toolkit';
import { cartSlice } from './slices/cartSlice';
import { userSlice } from './slices/userSlice';

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
        user: userSlice.reducer
    }
});

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;

export default store;
