export interface IInitiativeEntity {
  name: string;
  id: number;
  initiative: number;
  hitpoints?: number;
  player?: boolean;
  monster?: boolean;
}
