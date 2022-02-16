import { CSSProperties, FC } from 'react';
import deleteImg from '../../assets/img/delete.svg';
import editImg from '../../assets/img/edit.svg';

const IMG_STYLE: CSSProperties = {
  width: '20px',
  height: '20px',
};

interface ActionList {
  id: number;
  onEdit(id: number): void;
  onDelete(id: number): void;
}

export const ActionList: FC<ActionList> = ({ id, onEdit, onDelete }) => {
  return (
    <div className="d-flex gap-1">
      <button
        className={`btn btn-sm p-0`}
        type="button"
        onClick={() => onEdit(id)}
      >
        <img src={editImg} alt="edit" style={IMG_STYLE} />
      </button>
      <button
        className={`btn btn-sm p-0`}
        type="button"
        onClick={() => onDelete(id)}
      >
        <img src={deleteImg} alt="delete" style={IMG_STYLE} />
      </button>
    </div>
  );
};
