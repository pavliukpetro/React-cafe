import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
        }
    }
});