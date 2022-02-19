export type ProductItem = {
  id: number;
  name: string;
  measure_type: string;
  category_id: number;
  type: string;
  tax_id: number;
};

export interface ProductItemRequestError {
  field: string;
  message: string;
  code: string;
}

export interface ProductItemResponseData {
  data: ProductItem | null;
  errors: ProductItemRequestError[];
}

export interface ProductItemCategoryListItem {
  id: number;
  name: string;
}
