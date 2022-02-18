import { FC } from 'react';
import { HomePage } from '../pages/HomePage';
import { Page404 } from '../pages/Page404';
import { CategoryListPage } from '../pages/CategoryListPage';
import { AddCategoryItemPage } from '../pages/AddCategoryItemPage';
import { EditCategoryItemPage } from '../pages/EditCategoryItemPage';
import { ProductListPage } from '../pages/ProductListPage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes =
  | 'Home'
  | 'CategoryListPage'
  | 'AddCategoryItemPage'
  | 'EditCategoryItemPage'
  | 'ProductListPage'
  | 'Page404';

export const routeList: RouteItem[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },

  {
    name: 'CategoryListPage',
    path: '/category-list',
    component: CategoryListPage,
  },

  {
    name: 'AddCategoryItemPage',
    path: '/new-category-item',
    component: AddCategoryItemPage,
  },

  {
    name: 'EditCategoryItemPage',
    path: '/edit-category-page/:id',
    component: EditCategoryItemPage,
  },

  {
    name: 'ProductListPage',
    path: '/product-list',
    component: ProductListPage,
  },

  {
    name: 'Page404',
    path: '*',
    component: Page404,
  },
];
