import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { ProductListItem } from '../types';
import { SLICE_NAME } from './types';

export const getProductListRequest = createAsyncThunk(
  `${SLICE_NAME}/getTodoListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/products',
      method: 'get',
      params: {
        size: 10000,
        include: 'category',
      },
    };

    const response = await axios.request<{ data: ProductListItem[] }>(
      requestConfig,
    );

    return response.data.data;
  },
);
