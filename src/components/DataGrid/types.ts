export interface DataGridColumn<T = string> {
  id: number;
  name: T;
  title: string;
}

export interface DataGridRow {
  id: number;

  [keys: string]: number | string | null | undefined;
}
