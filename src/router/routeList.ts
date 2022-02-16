import { FC } from 'react';
import { HomePage } from '../pages/HomePage';
import { Page404 } from '../pages/Page404';
import { CategoryListPage } from '../pages/CategoryListPage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes = 'Home' | 'CategoryListForm' | 'Page404';

export const routeList: RouteItem[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },

  {
    name: 'CategoryListForm',
    path: '/category-list',
    component: CategoryListPage,
  },

  {
    name: 'Page404',
    path: '*',
    component: Page404,
  },
];
