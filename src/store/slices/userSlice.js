import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "../firebase";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        userId: '',
        isLoggedIn: false
    },
    reducers: {
        setActiveuser(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload.displayName;
            state.email = action.payload.email;
            state.userId = action.payload.uid;

            console.log(action);
        },
        logOut(state) {
            state.name = '';
            state.email = '';
            state.userId = '';
            state.isLoggedIn = false;

            toast.success(`You are logout`, {});
        },
        sendCartToDB(state, action) {
            set(ref(database, 'users/' + state.userId + '/cart'), action.payload);
        },
    }
});