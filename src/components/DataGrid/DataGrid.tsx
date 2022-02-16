import { FC } from 'react';
import styles from './DataGrid.module.scss';
import { DataGridColumn, DataGridRow } from './types';

interface DataGridProps {
  columnList: DataGridColumn[];
  rowList: DataGridRow[];
}

export const DataGrid: FC<DataGridProps> = ({ rowList, columnList }) => {
  return (
    <div className={styles.wrap}>
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>№</th>
            {columnList.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowList.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>

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
