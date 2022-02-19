import { createSlice } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { ProductItemCategoryListItem, ProductItemResponseData } from '../types';
import { getErrorData } from '../../../store/helpers';
import * as thunks from './thunks';
import { SLICE_NAME } from './types';

interface InitialState {
  isLoading: boolean;
  error: RequestError | null;
  responseData: ProductItemResponseData | null;
  initialState: ProductItemResponseData | null;
  categoryList: ProductItemCategoryListItem[] | null;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  responseData: null,
  initialState: null,
  categoryList: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: (state) => {
      state.error = null;
      state.responseData = null;
      state.initialState = null;
      state.categoryList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.addProductItemRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.addProductItemRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseData = action.payload;
      })
      .addCase(thunks.addProductItemRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });

    builder
      .addCase(thunks.getProductItemRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.getProductItemRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.initialState = action.payload;
      })
      .addCase(thunks.getProductItemRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });

    builder
      .addCase(thunks.patchProductItemRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.patchProductItemRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseData = action.payload;
      })
      .addCase(thunks.patchProductItemRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });

    builder
      .addCase(thunks.getCategoryListRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.categoryList = null;
      })
      .addCase(thunks.getCategoryListRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(thunks.getCategoryListRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });
  },
});
