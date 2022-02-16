import { FC } from 'react';
import styles from './DataGrid.module.scss';
import { DataGridColumn, DataGridRow } from './types';

interface DataGridProps {
  columnList: DataGridColumn[];
  rowList: DataGridRow[];
  action(id: number): JSX.Element;
  actionColumnTitle: string;
}

export const DataGrid: FC<DataGridProps> = ({
  rowList,
  columnList,
  action,
  actionColumnTitle,
}) => {
  return (
    <div className={styles.wrap}>
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>№</th>
            <th>{actionColumnTitle}</th>
            {columnList.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowList.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{action(row.id)}</td>

              {columnList.map((column) => (
                <td key={column.id}>{row[column.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rowList.length === 0 ? (
        <div className="msg-helper">Не найдено элементов для отображения</div>
      ) : null}
    </div>
  );
};
