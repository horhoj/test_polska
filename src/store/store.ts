import { configureStore } from '@reduxjs/toolkit';
import { categoryListSlice } from '../features/categoryList/categorySlice';
import { categoryItemSlice } from '../features/categoryItem/categoryItemSlice';
import { productListSlice } from '../features/productList/productListSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    categoryList: categoryListSlice.reducer,
    categoryItem: categoryItemSlice.reducer,
    productList: productListSlice.reducer,
  },
});
