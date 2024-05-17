import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllContent = createAsyncThunk('get/all-content', async () => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/posts`,

    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const posts = await response.data;
  return posts;
});

export const getContent = createAsyncThunk('get/all-content', async (id:number) => {

  const response = await axios.get(
    `http://localhost:3001/api/v1/posts/${id}`,

    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const post = await response.data;
  // return post;
  console.log(post);
});

const initialState = {
  postsArray: [],
  isLoading: false,
  loadingError: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllContent.pending, (state) => {
        state.isLoading = true;
        state.loadingError = false;
      })
      .addCase(getAllContent.fulfilled, (state, { payload }) => {
        state.postsArray = payload;
        state.isLoading = false;
        state.loadingError = false;
      })
      .addCase(getAllContent.rejected, (state) => {
        state.loadingError = true;
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
