import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { categoryListSlice } from '../categorySlice';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';
import { DataGridColumn } from '../../../components/DataGrid/types';
import { CategoryListItem } from '../types';
import { DataGrid } from '../../../components/DataGrid';
import { ActionList } from '../../../components/ActionList';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import styles from './CategoryListForm.module.scss';

const ERROR_TITLE = 'Category List request error!';
const ACTION_COLUMN_TITLE = 'Actions';

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

  const updateCategoryList = () => {
    dispatch(categoryListSlice.thunks.getCategoryListRequest());
  };

  useEffect(() => {
    updateCategoryList();
    return () => {
      dispatch(categoryListSlice.actions.clear());
    };
  }, []);

  const handleDelete = (id: number) => {
    const msg = `delete category with ID="${id}"`;
    if (confirm(msg)) {
      dispatch(categoryListSlice.thunks.deleteCategoryListItemRequest(id));
    }
  };

  const handleEdit = (id: number) => {
    const path = getRoutePath('EditCategoryItemPage', id.toString());
    dispatch(appSlice.actions.redirect(path));
  };

  const handleAdd = () => {
    const path = getRoutePath('AddCategoryItemPage');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div className="d-flex flex-column gap-2">
      <h3>Category list</h3>
      <div className={`d-flex gap-2 ${styles.buttons}`}>
        <button
          type={'button'}
          className="btn btn-primary w-100"
          onClick={updateCategoryList}
        >
          Update
        </button>
        <button
          type={'button'}
          className="btn btn-primary w-100"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {requestError ? (
        <RequestErrorMSG requestError={requestError} title={ERROR_TITLE} />
      ) : null}

      {categoryList ? (
        <DataGrid
          columnList={DATA_GRID_COLUMN_LIST}
          rowList={categoryList}
          action={(id: number) => (
            <ActionList id={id} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          actionColumnTitle={ACTION_COLUMN_TITLE}
        />
      ) : null}
    </div>
  );
};
