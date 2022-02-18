import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

import { categoryListSlice } from '../../features/categoryList/categorySlice';
import { categoryItemSlice } from '../../features/categoryItem/categoryItemSlice';
import { productListSlice } from '../../features/productList/productListSlice';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  //ЕСЛИ ХОТЯ БЫ 1 из данных флагов равен true, то будет показан индикатор загрузки
  const categoryListIsLoading = useAppSelector(
    categoryListSlice.selectors.getIsLoading,
  );
  const categoryItemIsLoading = useAppSelector(
    categoryItemSlice.selectors.getIsLoading,
  );

  const productListIsLoading = useAppSelector(
    productListSlice.selectors.getIsLoading,
  );

  const isLoading =
    categoryListIsLoading || categoryItemIsLoading || productListIsLoading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
