import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { ProductListItem } from '../types';
import { SLICE_NAME } from './types';
import { productListSlice } from './index';

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

export const deleteProductListItemRequest = createAsyncThunk(
  `${SLICE_NAME}/getTodoListRequest`,
  async (id: number, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/products/${id}`,
      method: 'delete',
    };

    await axios.request(requestConfig);

    store.dispatch(productListSlice.thunks.getProductListRequest());
  },
);
