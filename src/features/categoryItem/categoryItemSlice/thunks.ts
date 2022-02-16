import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getDefaultRequestConfig } from '../../../api/helpers';
import { CategoryItem, CategoryItemResponseData } from '../types';
import { appSlice } from '../../../store/app';
import { getRoutePath } from '../../../router';
import { SLICE_NAME } from './types';

export const addCategoryRequest = createAsyncThunk(
  `${SLICE_NAME}/addCategoryRequest`,
  async (categoryItem: CategoryItem, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: '/product_categories',
      method: 'post',
      data: categoryItem,
    };

    try {
      const response = await axios.request<CategoryItemResponseData>(
        requestConfig,
      );

      const path = getRoutePath('CategoryListPage');
      store.dispatch(appSlice.actions.redirect(path));

      return response.data;
    } catch (e: unknown) {
      const response = (e as AxiosError)?.response;
      if (response) {
        if (response.status === 422) {
          return response.data;
        }
      }
      throw e;
    }
  },
);

export const getCategoryItemRequest = createAsyncThunk(
  `${SLICE_NAME}/getCategoryItemRequest`,
  async (id: string) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/product_categories/${id}`,
      method: 'get',
    };

    const response = await axios.request<CategoryItemResponseData>(
      requestConfig,
    );

    return response.data;
  },
);

interface PatchCategoryRequestPayload {
  categoryItem: CategoryItem;
  id: string;
}

export const patchCategoryRequest = createAsyncThunk(
  `${SLICE_NAME}/patchCategoryRequest`,
  async ({ categoryItem, id }: PatchCategoryRequestPayload, store) => {
    const requestConfig: AxiosRequestConfig = {
      ...getDefaultRequestConfig(),
      url: `/product_categories/${id}`,
      method: 'put',
      data: categoryItem,
    };

    try {
      const response = await axios.request<CategoryItemResponseData>(
        requestConfig,
      );

      const path = getRoutePath('CategoryListPage');
      store.dispatch(appSlice.actions.redirect(path));

      return response.data;
    } catch (e: unknown) {
      const response = (e as AxiosError)?.response;
      if (response) {
        if (response.status === 422) {
          return response.data;
        }
      }
      throw e;
    }
  },
);
