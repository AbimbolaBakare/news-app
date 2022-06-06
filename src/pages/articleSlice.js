import { createSlice } from "@reduxjs/toolkit";
import { getTopHeadLines } from "../services/topHeadlineService";

const initialState = {
  topHeadlines: {
    loading: false,
    data: {},
    error: null,
  },
  singleArticle: {},
};

export const articleSlice = createSlice({
  name: "article",
  initialState,

  reducers: {
    setSingleArticle(state, action) {
      state.singleArticle = action.payload;
    },
  },

  extraReducers: {
    // TOP HEADLINES
    [getTopHeadLines.pending]: (state) => {
      state.topHeadlines.loading = true;
    },
    [getTopHeadLines.fulfilled]: (state, action) => {
      state.topHeadlines.data = action.payload;
      state.topHeadlines.loading = false;
    },
    [getTopHeadLines.rejected]: (state, action) => {
      state.topHeadlines.error = action.payload;
      state.topHeadlines.loading = false;
    },
  },
});

export const { setSingleArticle } = articleSlice.actions;

export const selectTopHeadlines = (state) => state.article.topHeadlines;
export const selectSingleArticle = (state) => state.article.singleArticle;

export default articleSlice.reducer;
