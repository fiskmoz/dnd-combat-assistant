export interface IPlayerXpTable {
  levels: IPlayerXpRow[];
}

export interface IPlayerXpRow {
  easy: number;
  medium: number;
  hard: number;
  deadly: number;
}
