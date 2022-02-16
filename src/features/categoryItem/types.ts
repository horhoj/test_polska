export interface CategoryItem {
  id: number;
  uid: string;
  name: string;
  updated_at: string;
  status: string;
}

export interface CategoryItemRequestError {
  field: string;
  message: string;
  code: string;
}

export interface CategoryItemResponseData {
  data: CategoryItem | null;
  errors: CategoryItemRequestError[];
}
