import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { categoryItemSlice } from '../categoryItemSlice';
import { CategoryItemForm } from '../CategoryItemForm';
import { CategoryItem } from '../types';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';

const REQUEST_ERROR_TITLE = 'Request data error!';
const getFormTitle = (id: string) => `Edit product category with id=${id}`;

interface EditCategoryItemFormProps {
  id: string;
}

export const EditCategoryItemForm: FC<EditCategoryItemFormProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const requestError = useAppSelector(
    categoryItemSlice.selectors.getRequestError,
  );
  const responseData = useAppSelector(
    categoryItemSlice.selectors.getResponseData,
  );
  const initialState = useAppSelector(
    categoryItemSlice.selectors.getInitialState,
  );

  useEffect(() => {
    return () => {
      dispatch(categoryItemSlice.actions.clear());
    };
  }, []);

  const handleSubmit = (values: CategoryItem) => {
    dispatch(
      categoryItemSlice.thunks.patchCategoryRequest({
        categoryItem: values,
        id,
      }),
    );
  };

  const handleCancel = () => {
    const path = getRoutePath('CategoryListPage');
    dispatch(appSlice.actions.redirect(path));
  };

  useEffect(() => {
    dispatch(categoryItemSlice.thunks.getCategoryItemRequest(id));
  }, []);

  return (
    <div>
      {requestError ? (
        <RequestErrorMSG
          requestError={requestError}
          title={REQUEST_ERROR_TITLE}
        />
      ) : null}
      {initialState?.data ? (
        <CategoryItemForm
          initialValues={initialState.data}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          errorList={responseData?.errors}
          formTitle={getFormTitle(id)}
        />
      ) : null}
    </div>
  );
};
