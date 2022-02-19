import { createSlice } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { ProductListItem } from '../types';
import { getErrorData } from '../../../store/helpers';
import * as thunks from './thunks';
import { SLICE_NAME } from './types';

interface InitialState {
  isLoading: boolean;
  productList: ProductListItem[] | null;
  error: RequestError | null;
}

const initialState: InitialState = {
  isLoading: false,
  productList: null,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: (state) => {
      state.productList = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(thunks.getProductListRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.productList = null;
      })
      .addCase(thunks.getProductListRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(thunks.getProductListRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });
  },
});
