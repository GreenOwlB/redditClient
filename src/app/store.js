import { configureStore } from "@reduxjs/toolkit";
import redditListReducer from '../features/redditListSlice';
import redditSearchReducer from '../features/searchSlice';

export const store = configureStore({
    reducer: {
        redditList: redditListReducer,
        redditSearch: redditSearchReducer
    }
})