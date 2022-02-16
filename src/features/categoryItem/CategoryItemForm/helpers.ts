import { CategoryItemRequestError } from '../types';

export const getError = (
  errorList: CategoryItemRequestError[],
  field: string,
): string =>
  errorList
    .filter((error) => error.field === field)
    .map((error) => error.message)
    .join(', ');
