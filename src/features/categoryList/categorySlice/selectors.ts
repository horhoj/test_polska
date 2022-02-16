import { RequestError, RootState } from '../../../store/types';
import { CategoryListItem } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.categoryList.isLoading;

export const getCategoryList = (state: RootState): CategoryListItem[] | null =>
  state.categoryList.categoryList;

export const getRequestError = (state: RootState): RequestError | null =>
  state.categoryList.error;
