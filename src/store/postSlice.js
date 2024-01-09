import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import mainArray from '../data/mainArray';

export const fetchContent = createAsyncThunk('fetch/users', async () => {});

// const querySnapshot = await getDocs(collection(db, 'users'));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, ' => ', doc.data());
// });

const initialState = {
  // currentUser: { email: '', password: '' },
  usersArray: [],
  isLoading: true,
  loadingError: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const currentUser = state.usersArray.filter(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );
      currentUser.loggedIn = true;

      const indexOfCurrentUser = state.usersArray.findIndex(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );

      state.usersArray[indexOfCurrentUser] = currentUser;
    },
    clearUser: () => null,

    addNewPost: (state, { payload }) => {
      const newPost = {
        postId: payload.id,
        topic: payload.topic,
        intro: payload.content.slice(0, 100),
        date: '',
        postContent: {
          content: payload.content,
          img: payload.imageFile,
          video: payload.videoFile,
        },
      };

      const loggedInUserIndex = state.posts.findIndex((post) => post.loggedIn);
      const loggedInUser = state.posts[loggedInUserIndex];

      let updatedPosts;

      if (loggedInUser) {
        loggedInUser.posts.push(newPost);
      }
      updatedPosts = [...state.posts];
      updatedPosts[loggedInUserIndex] = loggedInUser;
      // const loggedInUser = state.posts.filter((post) => post.loggedIn);

      state.posts = updatedPosts;
      console.log(state.posts);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, { payload }) => {
      state.usersArray = payload;
    });
  },
});

export const { setUser, addNewUserToStorage, addNewPost, addNewPostToStorage } =
  postSlice.actions;
export default postSlice.reducer;
