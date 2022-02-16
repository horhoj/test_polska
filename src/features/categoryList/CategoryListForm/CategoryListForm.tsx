import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { categoryListSlice } from '../categorySlice';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';
import { DataGridColumn } from '../../../components/DataGrid/types';
import { CategoryListItem } from '../types';
import { DataGrid } from '../../../components/DataGrid';

const ERROR_TITLE = 'Не удалось получить список категорий!';
const DATA_GRID_COLUMN_LIST: DataGridColumn<keyof CategoryListItem>[] = [
  { id: 1, name: 'id', title: 'ID' },
  { id: 2, name: 'name', title: 'name' },
  { id: 3, name: 'uid', title: 'uid' },
  { id: 4, name: 'status', title: 'status' },
  { id: 5, name: 'updated_at', title: 'updated_at' },
];

export const CategoryListForm: FC = () => {
  const dispatch = useAppDispatch();
  const requestError = useAppSelector(
    categoryListSlice.selectors.getRequestError,
  );
  const categoryList = useAppSelector(
    categoryListSlice.selectors.getCategoryList,
  );

  useEffect(() => {
    dispatch(categoryListSlice.thunks.getCategoryListRequest());
  }, []);

  return (
    <div>
      {requestError ? (
        <RequestErrorMSG requestError={requestError} title={ERROR_TITLE} />
      ) : null}

      {categoryList ? (
        <DataGrid columnList={DATA_GRID_COLUMN_LIST} rowList={categoryList} />
      ) : null}
    </div>
  );
};
