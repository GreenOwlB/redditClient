import { configureStore } from "@reduxjs/toolkit";
import redditListReducer from '../features/redditListSlice';

export const store = configureStore({
    reducer: {
        redditList: redditListReducer
    }
})