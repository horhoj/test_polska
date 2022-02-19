import { FC } from 'react';
import { useFormik } from 'formik';
import {
  ProductItem,
  ProductItemCategoryListItem,
  ProductItemRequestError,
} from '../types';
import { Select } from '../../../components/Select';
import { getError } from './helpers';
import styles from './ProductItemForm.module.scss';

interface ProductItemFromProps {
  initialValues: ProductItem;
  formTitle: string;
  onSubmit(values: ProductItem): void;
  onCancel(): void;
  errorList?: ProductItemRequestError[];
  categoryList: ProductItemCategoryListItem[];
}

export const ProductItemForm: FC<ProductItemFromProps> = ({
  initialValues,
  formTitle,
  errorList,
  onCancel,
  onSubmit,
  categoryList,
}) => {
  const formik = useFormik<ProductItem>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className="d-flex flex-column gap-3"
    >
      <div>
        <h4 className="h4">{formTitle}</h4>
        <div>
          <label className="form-label m-0">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder={'please input title'}
            {...formik.getFieldProps('name')}
          />
        </div>
        {errorList ? (
          <div className="text-danger">{getError(errorList, 'name')}</div>
        ) : null}
      </div>

      <div>
        <Select
          label={'Category'}
          placeholder={'Select category'}
          options={categoryList}
          {...formik.getFieldProps('category_id')}
          onChange={(value: number) => {
            formik
              .getFieldProps('category_id')
              .onChange({ target: { value, name: 'category_id' } });
          }}
        />
        {errorList ? (
          <div className="text-danger">
            {getError(errorList, 'category_id')}
          </div>
        ) : null}
      </div>
      <div className={`d-flex gap-2 ${styles.buttons}`}>
        <button type={'submit'} className="btn btn-primary w-100">
          save
        </button>
        <button
          type={'button'}
          className="btn btn-primary w-100"
          onClick={onCancel}
        >
          cancel
        </button>
      </div>

      {/*<div>*/}
      {/*  <pre>{JSON.stringify(categoryList, null, 2)}</pre>*/}
      {/*</div>*/}
    </form>
  );
};
