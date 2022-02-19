import { ProductItemRequestError } from '../types';

export const getError = (
  errorList: ProductItemRequestError[],
  field: string,
): string =>
  errorList
    .filter((error) => error.field === field)
    .map((error) => error.message)
    .join(', ');
