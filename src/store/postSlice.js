import { createSlice } from '@reduxjs/toolkit';
import postArrays from '../data/postArrays';
import usersArray from '../data/usersArray';

const initialState = {
  posts: postArrays,
  users: localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [],
  userIsLoggedIn: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewUser: (state, { payload }) => {
      state.users.push(payload);
      // state.userIsLoggedIn = true;
    },

    addNewUserToStorage: (state) => {
      // state.users.push(payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },

    addNewPost: () => {},
    addNewPostTosStorage: () => {},
  },

  // extraReducers: (builder) => {
  //   builder.addCase(storeUsers.fullfiled, (state, { payload }) => {

  //   });
  // },
});

export const { addNewUser, addNewUserToStorage } = postSlice.actions;
export default postSlice.reducer;
