import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        isCartVisible: false
    },
    reducers: {
        addItem(state, action) {
            console.log(action);
            const product = action.payload;
            state.totalQuantity += product.qty;
            state.totalAmount += product.price * product.qty;

            const existingProduct = state.items.find(item => item.id === product.id);

            if (!existingProduct) {
                state.items.push(product);
            } else {
                existingProduct.qty += product.qty;
            }

            toast.success(`${product.qty} ${product.name} ${product.qty > 1 ? 'are' : 'is'} added to cart`, {});
        },
        removeItem(state, action) {
            const product = action.payload;
            const productInCart = state.items.find(item => item.id === product.id);
            console.log(productInCart);
            state.totalQuantity = state.totalQuantity - productInCart.qty;
            state.totalAmount = state.totalAmount - productInCart.qty * productInCart.price;

            state.items = state.items.filter(item => item.id !== product.id);

            toast.error(`${product.qty} ${product.name} ${product.qty > 1 ? 'are' : 'is'} removed from cart`, {});

        },
        show(state) {
            state.isCartVisible = true;
        },
        hide(state) {
            state.isCartVisible = false;
        },
        clear(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
        restoreUserCart(state, action) {
            const cart = action.payload;
            state.items = cart.items || [];
            state.totalQuantity = cart.totalQuantity;
            state.totalAmount = cart.totalAmount;
        }
    }
});