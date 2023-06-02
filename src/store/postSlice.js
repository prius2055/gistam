import { createSlice } from '@reduxjs/toolkit';
import mainArray from '../data/mainArray';
// import usersArray from '../data/usersArray';

// const initialState = {
//   posts: postArrays,
//   users: localStorage.getItem('users')
//     ? JSON.parse(localStorage.getItem('users'))
//     : [],
//   userIsLoggedIn: false,
// };

const initialState = {
  posts: mainArray,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewUser: (state, { payload }) => {
      const newMember = {
        fullname: payload.fullname,
        Email: payload.Email,
        password: payload.password,
        registrationDate: '',
        memberImage: '',
        posts: [],
        loggedIn: true,
      };
      state.posts.push({ id: state.posts.length + 1, ...newMember });
    },

    addNewUserToStorage: () => {
      // state.posts.push(payload);
      // localStorage.setItem('users', JSON.stringify(state.users));
    },

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
    addNewPostToStorage: () => {},
  },

  // extraReducers: (builder) => {
  //   builder.addCase(storeUsers.fullfiled, (state, { payload }) => {

  //   });
  // },
});

export const {
  addNewUser,
  addNewUserToStorage,
  addNewPost,
  addNewPostToStorage,
} = postSlice.actions;
export default postSlice.reducer;

// const obg = {
//   postId: 'post2',
//   topic: '',
//   intro: '',
//   date: '',
//   postContent: {
//     content: '',
//     img: '',
//     video: '',
//   },
// };
