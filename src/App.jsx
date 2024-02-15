import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";

const router = createBrowserRouter([
    {
        path: '/',
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
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
