import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { productItemSlice } from '../ProductItemSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { ProductItem } from '../types';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';
import { ProductItemForm } from '../ProductItemForm';

interface EditProductItemFormProps {
  id: string;
}

const REQUEST_ERROR_TITLE = 'Request data error!';

const getFormTitle = (id: string) => `Edit product with id=${id}`;

export const EditProductItemForm: FC<EditProductItemFormProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const requestError = useAppSelector(
    productItemSlice.selectors.getRequestError,
  );
  const responseData = useAppSelector(
    productItemSlice.selectors.getResponseData,
  );
  const initialState = useAppSelector(
    productItemSlice.selectors.getInitialState,
  );
  const categoryList = useAppSelector(
    productItemSlice.selectors.getCategoryList,
  );

  const handleCancel = () => {
    const path = getRoutePath('ProductListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleSubmit = (values: ProductItem) => {
    dispatch(
      productItemSlice.thunks.patchProductItemRequest({
        productItem: values,
        id,
      }),
    );
  };

  useEffect(() => {
    dispatch(productItemSlice.thunks.getProductItemRequest(id));
    return () => {
      dispatch(productItemSlice.actions.clear());
    };
  }, []);

  return (
    <div>
      {requestError ? (
        <RequestErrorMSG
          requestError={requestError}
          title={REQUEST_ERROR_TITLE}
        />
      ) : null}
      {initialState?.data && categoryList ? (
        <ProductItemForm
          initialValues={initialState.data}
          formTitle={getFormTitle(id)}
          onSubmit={handleSubmit}
          errorList={responseData?.errors}
          onCancel={handleCancel}
          categoryList={categoryList}
        />
      ) : null}
    </div>
  );
};
