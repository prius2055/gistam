import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserConfirmationEmail = createAsyncThunk(
  'user/confirm',
  async (token) => {
    const response = await axios.get(
      `/confirmation?confirmation_token=${token}`
    );
    return response;
  }
);

interface UserState {
  user: string;
  isLoading: boolean;
  loadingError: boolean;
  confirmationMsg: any;
}

// Define the initial state using that type
const initialState: UserState = {
  user: '',
  isLoading: false,
  loadingError: false,
  confirmationMsg: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserConfirmationEmail.fulfilled,
      (state, { payload }) => {
        state.confirmationMsg = payload;
      }
    );
  },
});

export default userSlice.reducer;
