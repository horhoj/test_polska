import { createSlice } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { getErrorData } from '../../../store/helpers';
import { CategoryItemResponseData } from '../types';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isLoading: boolean;
  error: RequestError | null;
  responseData: CategoryItemResponseData | null;
  initialState: CategoryItemResponseData | null;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  responseData: null,
  initialState: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: (state) => {
      state.error = null;
      state.responseData = null;
      state.initialState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.addCategoryRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.addCategoryRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseData = action.payload;
      })
      .addCase(thunks.addCategoryRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });

    builder
      .addCase(thunks.getCategoryItemRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.getCategoryItemRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.initialState = action.payload;
      })
      .addCase(thunks.getCategoryItemRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });

    builder
      .addCase(thunks.patchCategoryRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(thunks.patchCategoryRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseData = action.payload;
      })
      .addCase(thunks.patchCategoryRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = getErrorData(error);
      });
  },
});
