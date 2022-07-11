import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseSubReddits } from "../data/baseSubReddits";

const initialState = {
    baseSubReddits: baseSubReddits,
    selectedSubreddit: 'AskUK',
    redditList: [],
    isLoading: true,
    hasError: false

}

export const fetchRedditPosts = createAsyncThunk(
    'list/fetchBySelectedSubReddit',
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const json = await response.json();
        return json;
    }
    )

export const redditListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        changeSubReddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        }
    },
    extraReducers: {
        [fetchRedditPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchRedditPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.redditList = action.payload.data.children;
        },
        [fetchRedditPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
});

export const { changeSubReddit } = redditListSlice.actions;

export const selectSubReddit = state => state.redditList.selectedSubreddit;

export const selectBaseSubReddits = (state) => {
    const sortedList = [...state.redditList.baseSubReddits];
    sortedList.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    return sortedList;
};

export const selectIsLoading = state => state.redditList.isLoading;

export const selectList = state => state.redditList.redditList;




export default redditListSlice.reducer;