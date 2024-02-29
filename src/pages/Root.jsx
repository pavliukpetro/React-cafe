import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import CartModal from "../components/Cart/CartModal";
import { useEffect } from "react";
import { auth } from "../store/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { cartActions, userActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Root() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Restore User from Firebase Auth
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user

                dispatch(userActions.setActiveuser(user));
                // ...
            } else {
                console.log('no user');
                // User is signed out
                // ...
            }
        });
    }, []);

    useEffect(() => {
        if (user.isLoggedIn) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${user.userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val().cart);
                    dispatch(cartActions.restoreUserCart(snapshot.val().cart));
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

        }
    }, [user]);

    return (
        <>
            <Header />

            <ToastContainer position="bottom-right" />

            <CartModal />

            <Outlet />
        </>
    )
}
