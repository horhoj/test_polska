import { configureStore } from '@reduxjs/toolkit';
import { categoryListSlice } from '../features/categoryList/categorySlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    categoryList: categoryListSlice.reducer,
  },
});
