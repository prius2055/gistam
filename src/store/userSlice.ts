import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CurrentUserDetails } from '../data/userData';

export const getCurrentUser = createAsyncThunk('user/current', async () => {
  const authToken = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3001/currentuser', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
  const user = await response.data;
  return user;
});

// export const deleteUser = createAsyncThunk('delete/user', async () => {
//   const response = await axios.delete('http://localhost:3001/logout', {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: authToken,
//     },
//   });
//   const user = await response.data;
//   return user;
// });

interface CurrentUserState {
  currentUser: CurrentUserDetails;
  isLoading: boolean;
  loadingError: boolean;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  currentUser: {
    id: 1,
    firstname: '',
    lastname: '',
    email: '',
  },
  isLoading: false,
  loadingError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = {
        id: 1,
        firstname: '',
        lastname: '',
        email: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.loadingError = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoading = false;
        state.loadingError = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loadingError = true;
        state.isLoading = false;
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
