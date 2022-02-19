import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {
  ProductItem,
  ProductItemCategoryListItem,
  ProductItemResponseData,
} from '../types';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { SLICE_NAME } from './types';
import { productItemSlice } from './index';

const ERROR_RESPONSE_EMPTY_CATEGORY: ProductItemResponseData = {
  data: null,
  errors: [
    {
      field: 'category_id',
      code: '',
      message: 'please select a category!',
    },
  ],
};

export const addProductItemRequest = createAsyncThunk(
  `${SLICE_NAME}/addProductItemRequest`,
  async (productItem: ProductItem, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/products',
      method: 'post',
      data: productItem,
    };

    try {
      const response = await axios.request<ProductItemResponseData>(
        requestConfig,
      );

      const path = getRoutePath('ProductListPage');
      store.dispatch(appSlice.actions.redirect(path));

      return response.data;
    } catch (e: unknown) {
      const response = (e as AxiosError)?.response;
      if (response) {
        if (response.status === 422) {
          return response.data;
        }

        if (response.status === 404) {
          // since the response from the server does not come with an
          // empty value of the category_id field, we emulate it ourselves.
          return ERROR_RESPONSE_EMPTY_CATEGORY;
        }
      }
      throw e;
    }
  },
);

interface PatchProductCategoryPayload {
  productItem: ProductItem;
  id: string;
}

export const patchProductItemRequest = createAsyncThunk(
  `${SLICE_NAME}/patchProductRequest`,
  async ({ productItem, id }: PatchProductCategoryPayload, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/products/${id}`,
      method: 'put',
      data: productItem,
    };

    try {
      const response = await axios.request<ProductItemResponseData>(
        requestConfig,
      );

      const path = getRoutePath('ProductListPage');
      store.dispatch(appSlice.actions.redirect(path));

      return response.data;
    } catch (e: unknown) {
      const response = (e as AxiosError)?.response;
      if (response) {
        if (response.status === 422) {
          return response.data;
        }

        if (response.status === 404) {
          // since the response from the server does not come with an
          // empty value of the category_id field, we emulate it ourselves.
          return ERROR_RESPONSE_EMPTY_CATEGORY;
        }
      }
      throw e;
    }
  },
);

export const getCategoryListRequest = createAsyncThunk(
  `${SLICE_NAME}/getCategoryListRequest`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/product_categories',
      params: {
        size: 10000,
      },
    };

    const response = await axios.request<{
      data: ProductItemCategoryListItem[];
    }>(requestConfig);

    return response.data.data;
  },
);

export const getProductItemRequest = createAsyncThunk(
  `${SLICE_NAME}/getProductItemRequest`,
  async (id: string, state) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/products/${id}`,
      method: 'get',
    };

    const response = await axios.request<ProductItemResponseData>(
      requestConfig,
    );

    state.dispatch(productItemSlice.thunks.getCategoryListRequest());

    return response.data;
  },
);
