import { ProductListItem, ProductListItemPreview } from '../types';

const EMPTY_VALUE = '<empty>';

const productListDataTransform = (
  productListItem: ProductListItem,
): ProductListItemPreview => ({
  id: productListItem.id,
  name: productListItem.name,
  categoryId:
    productListItem.category_id === undefined ||
    productListItem.category_id === null
      ? EMPTY_VALUE
      : productListItem.category_id.toString(),
  categoryId2:
    productListItem.category?.id === undefined ||
    productListItem.category?.id === null
      ? EMPTY_VALUE
      : productListItem.category.id.toString(),
  categoryName:
    productListItem.category?.name === undefined ||
    productListItem.category?.name === null
      ? EMPTY_VALUE
      : productListItem.category.name,
});

export const getProductListPreview = (
  productList: ProductListItem[],
): ProductListItemPreview[] =>
  productList.map((productListItem) =>
    productListDataTransform(productListItem),
  );
