// import { createStore } from "redux";

// const counterReducer = (state = { counter: 0, showCounter: true }, action) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'increase') {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         }
//     }

//     return state;
// }

// const store = createStore(counterReducer);

// export default store;

import {configureStore, createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
        showCounter: true
    },
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: 'Petro',
        userRole: 'admin'
    },
    reducers: {
        login() {

        },
        logout() {

        }
    }
});

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer
    }
});

export const counterActions = counterSlice.actions;
export const userActions = userSlice.actions;

export default store;
