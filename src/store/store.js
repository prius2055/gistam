import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import authReducer from './postSlice';

const store = configureStore({
  reducer: {
    users: postReducer,
    // auth: authReducer,
  },
});

export default store;
