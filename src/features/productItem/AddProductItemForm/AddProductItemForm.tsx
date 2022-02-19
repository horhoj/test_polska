import { FC, useEffect } from 'react';
import { ProductItem } from '../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { productItemSlice } from '../ProductItemSlice';
import { ProductItemForm } from '../ProductItemForm';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';

const PRODUCT_ITEM_INITIAL_VALUES: ProductItem = {
  id: 0,
  name: '',
  measure_type: 'KILOGRAM',
  category_id: 0,
  type: 'BASIC',
  tax_id: 1,
};

const REQUEST_ERROR_TITLE = 'Request error!';
const FORM_TITLE = 'Add new product category';

export const AddProductItemForm: FC = () => {
  const dispatch = useAppDispatch();

  const responseData = useAppSelector(
    productItemSlice.selectors.getResponseData,
  );

  const requestError = useAppSelector(
    productItemSlice.selectors.getRequestError,
  );

  const categoryList = useAppSelector(
    productItemSlice.selectors.getCategoryList,
  );

  useEffect(() => {
    dispatch(productItemSlice.thunks.getCategoryListRequest());
    return () => {
      dispatch(productItemSlice.actions.clear());
    };
  }, []);

  const handleSubmit = (values: ProductItem) => {
    dispatch(productItemSlice.thunks.addProductItemRequest(values));
  };

  const handleCancel = () => {
    const path = getRoutePath('ProductListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div>
      {requestError ? (
        <RequestErrorMSG
          requestError={requestError}
          title={REQUEST_ERROR_TITLE}
        />
      ) : null}
      {categoryList ? (
        <ProductItemForm
          initialValues={PRODUCT_ITEM_INITIAL_VALUES}
          formTitle={FORM_TITLE}
          errorList={responseData?.errors}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          categoryList={categoryList}
        />
      ) : null}
    </div>
  );
};
