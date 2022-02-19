import { RequestError, RootState } from '../../../store/types';
import { ProductItemCategoryListItem, ProductItemResponseData } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.productItem.isLoading;

export const getRequestError = (state: RootState): RequestError | null =>
  state.productItem.error;

export const getResponseData = (
  state: RootState,
): ProductItemResponseData | null => state.productItem.responseData;

export const getInitialState = (
  state: RootState,
): ProductItemResponseData | null => state.productItem.initialState;

export const getCategoryList = (
  state: RootState,
): ProductItemCategoryListItem[] | null => state.productItem.categoryList;
