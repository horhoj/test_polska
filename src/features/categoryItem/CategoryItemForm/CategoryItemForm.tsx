import { FC } from 'react';
import { useFormik } from 'formik';
import { CategoryItem, CategoryItemRequestError } from '../types';
import { getError } from './helpers';
import styles from './CategoryItemForm.module.scss';

interface CategoryItemFormProps {
  initialValues: CategoryItem;
  onSubmit(values: CategoryItem): void;
  onCancel(): void;
  errorList?: CategoryItemRequestError[];
  formTitle: string;
}

export const CategoryItemForm: FC<CategoryItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  errorList,
  formTitle,
}) => {
  const formik = useFormik<CategoryItem>({
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
    </form>
  );
};
