import { createContext } from 'react';

export const CartContext = createContext({
    title: 'Mini Cart',
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isCartVisible: false,
    showCart: () => { },
    hideCart: () => { },
    addItem: () => { },
    deleteItem: () => { },
    updateItem: () => { },
});

export const UserContext = createContext({
    name: 'Petro',
    isAuth: true
});
