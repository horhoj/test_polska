import { RequestError, RootState } from '../../../store/types';
import { ProductListItem } from '../types';

export const getIsLoading = (state: RootState): boolean =>
  state.productList.isLoading;

export const getProductList = (state: RootState): ProductListItem[] | null =>
  state.productList.productList;

export const getRequestError = (state: RootState): RequestError | null =>
  state.productList.error;
