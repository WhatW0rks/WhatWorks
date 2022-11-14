// Redux test
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',initialState: {value: 0},
    reducers: {
        incremented: state => {
            state.value += 1;
        },
        decremented: state => {
            state.value -= 1;
        },
        reset: state => {
            state.value = 0;
        }
    }

    }
);

export const {incremented, decremented, reset} = counterSlice.actions;

export const store = configureStore({reducer: counterSlice.reducer});
