import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EditCategoryItemForm } from '../../features/categoryItem/EditCategoryItemForm';

export const EditCategoryItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <EditCategoryItemForm id={String(id)} />
    </>
  );
};
