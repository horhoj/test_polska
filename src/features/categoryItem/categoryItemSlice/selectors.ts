import { RequestError, RootState } from '../../../store/types';
import { CategoryItemResponseData } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.categoryItem.isLoading;

export const getRequestError = (state: RootState): RequestError | null =>
  state.categoryItem.error;

export const getResponseData = (
  state: RootState,
): CategoryItemResponseData | null => state.categoryItem.responseData;

export const getInitialState = (
  state: RootState,
): CategoryItemResponseData | null => state.categoryItem.initialState;
