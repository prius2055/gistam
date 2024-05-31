import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewLikeObj } from '../data/likeData';

const authToken = localStorage.getItem('token');

export const postLike = createAsyncThunk(
  'post/like',
  async (likeObj: NewLikeObj) => {
    const response = await axios.post(
      `https://chatterapp-backend.onrender.com/api/v1/users/${likeObj.user_id}/posts/${likeObj.post_id}/likes`,
      { like: likeObj },

      {
        headers: {
          'content-type': 'application/json',
          Authorization: authToken,
        },
      }
    );
    const like = await response.data;
    return like;
  
  }
);

export const deleteLike = createAsyncThunk(
  'delete/like',
  async (details: NewLikeObj) => {
    const response = await axios.delete(
      `https://chatterapp-backend.onrender.com/api/v1/users/${details.user_id}/posts/${details.post_id}/like`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
      }
    );
    const like = await response;
    return like
  }
);

const initialState = {
  likesArray: [],
  isLoading: false,
  loadingError: false,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
});

export default likeSlice.reducer;
