import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { CategoryListItem } from '../types';
import { SLICE_NAME } from './types';

export const getCategoryListRequest = createAsyncThunk(
  `${SLICE_NAME}/getTodoListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/product_categories',
      method: 'get',
    };

    const response = await axios.request<{ data: CategoryListItem[] }>(
      requestConfig,
    );

    return response.data.data;
  },
);
