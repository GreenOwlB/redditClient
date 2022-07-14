import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    searchTitle: true,
    searchText: true,
    // searchComments: false,
}

export const searchSlice = createSlice({
    name: 'redditSearch',
    initialState,
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
        toggleSearchTitle: (state, action) => {
            state.searchTitle = !state.searchTitle
        },
        toggleSearchText: (state, action) => {
            state.searchText = !state.searchText
        },
        // toggleSearchComments: (state, action) => {
        //     state.searchComments = !state.searchComments
        // }
    }
});

export const { 
    search, 
    toggleSearchTitle, 
    toggleSearchText, 
    // toggleSearchComments 
} = searchSlice.actions;

export const selectSearch = state => state.redditSearch.search;
export const selectSearchTitle = state => state.redditSearch.searchTitle;
export const selectSearchText = state => state.redditSearch.searchText;
// export const selectSearchComments = state => state.redditSearch.searchComments;


export default searchSlice.reducer;