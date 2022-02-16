import { FC, useEffect } from 'react';
import { CategoryItemForm } from '../CategoryItemForm';
import { CategoryItem } from '../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { categoryItemSlice } from '../categoryItemSlice';
import { getRoutePath } from '../../../router';
import { appSlice } from '../../../store/app';
import { RequestErrorMSG } from '../../../components/RequestErrorMSG';

const CATEGORY_ITEM_INITIAL_VALUES: CategoryItem = {
  id: 0,
  name: '',
  uid: '',
  status: 'ENABLED',
  updated_at: '',
};

const REQUEST_ERROR_TITLE = 'Request error!';
const FORM_TITLE = 'Add new product category';

export const AddCategoryItemForm: FC = () => {
  const dispatch = useAppDispatch();
  const requestError = useAppSelector(
    categoryItemSlice.selectors.getRequestError,
  );

  const responseData = useAppSelector(
    categoryItemSlice.selectors.getResponseData,
  );

  useEffect(() => {
    return () => {
      dispatch(categoryItemSlice.actions.clear());
    };
  }, []);

  const handleSubmit = (values: CategoryItem) => {
    dispatch(categoryItemSlice.thunks.addCategoryRequest(values));
  };

  const handleCancel = () => {
    const path = getRoutePath('CategoryListPage');
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
      <CategoryItemForm
        initialValues={CATEGORY_ITEM_INITIAL_VALUES}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        errorList={responseData?.errors}
        formTitle={FORM_TITLE}
      />
    </div>
  );
};
