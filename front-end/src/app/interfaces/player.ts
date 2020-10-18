export interface Player {
  level: number;
  xpthreshhold?: PlayerXpRow;
  name: string;
  initiative?: number;
  class?: string;
  race?: string;
  strength?: number;
  intelligence?: number;
  wisdom?: number;
  dexterity?: number;
  constitution?: number;
  charisma?: number;
}

export interface PlayerXpTable {
  levels: PlayerXpRow[];
}

export interface PlayerXpRow {
  easy: number;
  medium: number;
  hard: number;
  deadly: number;
}
