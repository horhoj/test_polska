export type ProductListItem = {
  id: number;
  name: string;
  category_id?: number;
  category?: {
    id: number;
    name: string;
  };
};

export type ProductListItemPreview = {
  id: number;
  name: string;
  categoryId: string;
  categoryId2: string;
  categoryName: string;
};
