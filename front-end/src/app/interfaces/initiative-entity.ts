export interface IInitiativeEntity {
  name: string;
  id: number;
  initiative: number;
  suffix?: number;
  hitpoints?: number;
  player?: boolean;
  monster?: boolean;
}
