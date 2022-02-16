import { createSlice } from '@reduxjs/toolkit';
import { CategoryListItem } from '../types';
import { RequestError } from '../../../store/types';
import { getErrorData } from '../../../store/helpers';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isLoading: boolean;
  categoryList: CategoryListItem[] | null;
  error: RequestError | null;
}

const initialState: InitialState = {
  isLoading: false,
  categoryList: null,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
