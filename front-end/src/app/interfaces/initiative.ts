export interface InitiativeEntity {
  name: string;
  id: number;
  initiative: number;
  initiative_duplicate: boolean;
  priority: number;
  suffix?: number;
  hitpoints?: number;
  player?: boolean;
  monster?: boolean;
}
