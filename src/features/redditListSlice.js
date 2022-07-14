import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseSubReddits } from "../data/baseSubReddits";

const initialState = {
    baseSubReddits: baseSubReddits,
    savedSubReddits: [],
    activeSubReddits: [],
    selectedSubreddit: 'AskUK',
    redditList: [],
    isLoading: true,
    hasError: false,
    commentsList: [],
    commentsIsLoading: false,
    commentsHasError: false,
    commentsOpen: false,
    currentComments: '',

}

// export const retrieveSavedSubReddits = () => {

// }

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
        fetchSavedSubReddits: (state, action) => {
            if (localStorage.getItem('savedSubReddits')) {
                const array = JSON.parse(localStorage.getItem('savedSubReddits'));
                state.savedSubReddits = array;
                state.activeSubReddits = state.baseSubReddits.concat(array);
                return;
            }
            return;
            
        },
        addSubReddit: (state, action) => {
            const redditObj = {
                name: action.payload
            }
            const array = [];
            if (localStorage.getItem('savedSubReddits')) {
                array.concat(JSON.parse(localStorage.getItem('savedSubReddits')));
            } 
            array.push(redditObj);
            localStorage.setItem('savedSubReddits', JSON.stringify(array));
            state.savedSubReddits.push(redditObj);
            state.activeSubReddits.push(redditObj);
        },
        changeSubReddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
        closeComments: (state) => {
            state.commentsOpen = false;
        },
        openComments: (state) => {
            state.commentsOpen = true;
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
            state.commentsOpen = false;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.commentsIsLoading = false;
            state.commentsHasError = false;
            state.commentsOpen = true;
            state.commentsList = action.payload.comments;
            state.currentComments = action.payload.item;
        },
        [fetchComments.rejected]: (state, action) => {
            state.commentsIsLoading = false;
            state.commentsHasError = true;
        },

    }
});

export const { 
    addSubReddit,
    changeSubReddit, 
    closeComments, 
    openComments, 
    fetchSavedSubReddits 
} = redditListSlice.actions;

export const selectSubReddit = state => state.redditList.selectedSubreddit;

export const selectActiveSubReddits = (state) => {
    const sortedList = [...state.redditList.activeSubReddits];
    sortedList.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    return sortedList;
};

export const selectIsLoading = state => state.redditList.isLoading;

export const selectList = state => state.redditList.redditList;

export const selectComments = state => state.redditList.commentsList;
export const selectOpenComments = state => state.redditList.openComments;

export const selectCurrentComments = state => state.redditList.currentComments;


export default redditListSlice.reducer;