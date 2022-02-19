import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { productListSlice } from '../productListSlice';
import { DataGrid } from '../../../components/DataGrid';
import { DataGridColumn } from '../../../components/DataGrid/types';
import { ProductListItemPreview } from '../types';
import styles from '../../categoryList/CategoryListForm/CategoryListForm.module.scss';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';
import { ActionList } from '../../../components/ActionList';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { getProductListPreview } from './helpers';

const ACTIONS_COLUMN_LIST_TITLE = 'Actions';
const ERROR_TITLE = 'Product List request error!';

const COLUMN_LIST: DataGridColumn<keyof ProductListItemPreview>[] = [
  { id: 1, name: 'id', title: 'ID' },
  { id: 2, name: 'name', title: 'name' },
  { id: 3, name: 'categoryName', title: 'categoryName' },
  { id: 4, name: 'categoryId', title: 'categoryId' },
  { id: 5, name: 'categoryId2', title: 'categoryId2' },
];

export const ProductListForm: FC = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(productListSlice.selectors.getProductList);
  const requestError = useAppSelector(
    productListSlice.selectors.getRequestError,
  );

  useEffect(() => {
    updateProductList();
    return () => {
      dispatch(productListSlice.actions.clear());
    };
  }, []);

  const updateProductList = () => {
    dispatch(productListSlice.thunks.getProductListRequest());
  };

  const handleAdd = () => {
    const path = getRoutePath('AddProductItemPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleEdit = (id: number) => {
    const path = getRoutePath('EditProductItemPage', id.toString());
    dispatch(appSlice.actions.redirect(path));
  };

  const handleDelete = (id: number) => {
    const msg = `delete category with ID="${id}"`;
    if (confirm(msg)) {
      dispatch(productListSlice.thunks.deleteProductListItemRequest(id));
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <h3>Product list</h3>
      <div className={`d-flex gap-2 ${styles.buttons}`}>
        <button
          type={'button'}
          className="btn btn-primary w-100"
          onClick={updateProductList}
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

      {productList ? (
        <DataGrid
          columnList={COLUMN_LIST}
          rowList={getProductListPreview(productList)}
          action={(id: number) => (
            <ActionList id={id} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          actionColumnTitle={ACTIONS_COLUMN_LIST_TITLE}
        />
      ) : null}
      {/*{productList ? (*/}
      {/*  <pre>{JSON.stringify(getProductListPreview(productList), null, 2)}</pre>*/}
      {/*) : null}*/}
    </div>
  );
};
