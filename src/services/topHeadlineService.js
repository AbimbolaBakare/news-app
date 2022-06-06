import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiKey, baseUrl } from "../config";
import axios from "axios";

axios.defaults.headers.common["X-Api-Key"] = `${apiKey}`;

export const getTopHeadLines = createAsyncThunk(
  "article/getTopHeadLines",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/top-headlines?country=us&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchNews = createAsyncThunk(
  "article/getTopHeadLines",
  async (searchParam, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/everything?${searchParam}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
