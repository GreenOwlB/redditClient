import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseSubReddits } from "../data/baseSubReddits";

const initialState = {
    baseSubReddits: baseSubReddits,
    selectedSubreddit: 'AskUK',
    redditList: [],
    isLoading: true,
    hasError: false,
    commentsList: [],
    commentsIsLoading: false,
    commentsHasError: false,
    currentComments: '',
    search: '',
    // filteredRedditList: []

}

export const fetchRedditPosts = createAsyncThunk(
    'list/fetchBySelectedSubReddit',
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const json = await response.json();
        return json;
    }
);

export const fetchComments = createAsyncThunk(
    'list/fetchCommentsById',
    async ({subreddit, item}) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${item}.json`);
        const json = await response.json();
        const comments = json[1].data.children;
        return {comments, item};
    }
)

export const redditListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        changeSubReddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
        search: (state, action) => {
            state.search = action.payload;
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
        [fetchComments.pending]: (state, action) => {
            state.commentsIsLoading = true;
            state.commentsHasError = false;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.commentsIsLoading = false;
            state.commentsHasError = false;
            state.commentsList = action.payload.comments;
            state.currentComments = action.payload.item;
        },
        [fetchComments.rejected]: (state, action) => {
            state.commentsIsLoading = false;
            state.commentsHasError = true;
        },

    }
});

export const { changeSubReddit, search } = redditListSlice.actions;

export const selectSubReddit = state => state.redditList.selectedSubreddit;

export const selectBaseSubReddits = (state) => {
    const sortedList = [...state.redditList.baseSubReddits];
    sortedList.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    return sortedList;
};

export const selectIsLoading = state => state.redditList.isLoading;

export const selectList = state => state.redditList.redditList;

export const selectComments = state => state.redditList.commentsList;

export const selectCurrentComments = state => state.redditList.currentComments;

export const selectSearch = state => state.redditList.search;

// export const selectFilteredRedditList = state => state.redditList.filteredRedditList;




export default redditListSlice.reducer;