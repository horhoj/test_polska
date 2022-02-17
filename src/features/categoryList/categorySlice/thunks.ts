import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { CategoryListItem } from '../types';
import { SLICE_NAME } from './types';
import { categoryListSlice } from './index';

export const getCategoryListRequest = createAsyncThunk(
  `${SLICE_NAME}/getTodoListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/product_categories',
      method: 'get',
      params: {
        size: 10000,
      },
    };

    const response = await axios.request<{ data: CategoryListItem[] }>(
      requestConfig,
    );

    return response.data.data;
  },
);

export const deleteCategoryListItemRequest = createAsyncThunk(
  `${SLICE_NAME}/deleteCategoryListItemRequest`,
  async (id: number, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/product_categories/${id}`,
      method: 'delete',
    };

    await axios.request(requestConfig);

    store.dispatch(categoryListSlice.thunks.getCategoryListRequest());
  },
);
