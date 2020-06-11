import { IPlayerXpRow } from "./player-xp-table";

export interface Player {
  level: number;
  xpthreshhold?: IPlayerXpRow;
  name: string;
  class?: string;
  race?: string;
  strength?: number;
  intelligence?: number;
  wisdom?: number;
  dexterity?: number;
  constitution?: number;
  charisma?: number;
}
