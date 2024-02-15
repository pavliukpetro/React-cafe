import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Header />

            <ToastContainer position="bottom-right" />

            <Outlet />
        </>
    )
}
