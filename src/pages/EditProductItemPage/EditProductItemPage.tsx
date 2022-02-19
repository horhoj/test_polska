import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EditProductItemForm } from '../../features/productItem/EditProductItemForm';

export const EditProductItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <EditProductItemForm id={String(id)} />
    </>
  );
};
