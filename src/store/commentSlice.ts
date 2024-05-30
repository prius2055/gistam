import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment, CommentDeleteData } from '../data/commentData';

export const postComment = createAsyncThunk(
  'post/comment',
  async (commentObj: Comment) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:3001/api/v1/users/${commentObj.user_id}/posts/${commentObj.post_id}/comments`,
      { comment: commentObj },

      {
        headers: {
          'content-type': 'application/json',
          Authorization: authToken,
        },
      }
    );
    const comment = await response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'delete/comment',
  async (details: CommentDeleteData) => {
    const authToken = localStorage.getItem('token');
    const response = await axios.delete(
      `http://localhost:3001/api/v1/users/${details.userId}/posts/${details.postId}/comments/${details.commentId}`,

      {
        headers: {
          'content-type': 'application/json',
          Authorization: authToken,
        },
      }
    );
    const post = await response.data;
    return post;
  }
);


const initialState = {
  commentsArray: [],
  isLoading: false,
  loadingError: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},

});

export default commentSlice.reducer;
