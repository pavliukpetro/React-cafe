import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CartModal from "../components/Cart/CartModal";

export default function Root() {
    return (
        <>
            <Header />

            <ToastContainer position="bottom-right" />

            <CartModal />

            <Outlet />
        </>
    )
}
