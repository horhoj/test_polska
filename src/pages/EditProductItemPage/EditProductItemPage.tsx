import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const EditProductItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return <>EditProductItemPage {id}</>;
};
