import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewPostObj, PostFileFormData } from '../data/postData';

export const postNewContent = createAsyncThunk(
  'post/new-content',
  async (data) => {
    // const userId = postData.get('post[user_id]');
    // console.log(userId)
    const authToken = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:3001/api/v1/users/posts`,
      { data},
      // {
      //   headers: {
      //     'content-type': 'application/json',
      //     authorization: authToken,
      //   },
      // }
    );
    const post = await response.data;
    return post;
  }
);

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
