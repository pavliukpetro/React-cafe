import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account/Account";
import Orders from "./pages/Account/Orders";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
// import { CartContext } from './store/cart-context';
// import { useState } from 'react';

function App() {
    // const addItem = (product) => {
    //     console.log(product);
    //     setCart((prev) => {
    //         const updatedTotalQty = prev.totalQuantity + product.qty;
    //         const updatedTotalAmount = prev.totalAmount + product.price * product.qty;
    //         const existingProductIndex = prev.items.findIndex((i) => i.id === product.id);
    //         const existingProduct = prev.items[existingProductIndex];

    //         let updatedProduct;
    //         let updatedItems = [...prev.items];

    //         if (existingProductIndex !== -1) {
    //             updatedProduct = {
    //                 ...existingProduct,
    //                 qty: existingProduct.qty + product.qty
    //             };
    //             updatedItems[existingProductIndex] = updatedProduct;
    //         } else {
    //             updatedItems.push(product);
    //         }

    //         return {
    //             items: updatedItems,
    //             totalQuantity: updatedTotalQty,
    //             totalAmount: updatedTotalAmount,
    //             isCartVisible: prev.isCartVisible,
    //         }
    //     });
    // }

    // const [cart, setCart] = useState({
    //     items: [],
    //     totalQuantity: 0,
    //     totalAmount: 0,
    //     isCartVisible: false,
    // });

    // const initCart = {
    //     title: 'Mini Cart',
    //     items: cart.items,
    //     totalQuantity: cart.totalQuantity,
    //     totalAmount: cart.totalAmount,
    //     isCartVisible: cart.isCartVisible,
    //     showCart: () => {
    //         console.log('Show cart');
    //         setCart((prev) => {
    //             return { ...prev, isCartVisible: true };
    //         });
    //     },
    //     hideCart: () => {
    //         console.log('Hide cart');
    //         setCart((prev) => {
    //             return { ...prev, isCartVisible: false };
    //         });
    //     },
    //     addItem: addItem,
    // };

    const router = createBrowserRouter([
        {
            path: '/',
            // element: <CartContext.Provider value={initCart}><Root /></CartContext.Provider>,
            element: <Root />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/account',
                    element: <Account />
                },
                {
                    path: '/orders',
                    element: <Orders />
                },
                {
                    path: '/checkout',
                    element: <Checkout />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App
