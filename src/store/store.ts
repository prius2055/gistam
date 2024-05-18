import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
