export interface IMonsterIndex {
  index: string;
  name: string;
  size: string;
  type: string;
  subtype?: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: string;
  strength?: number;
  intelligence?: number;
  wisdom?: number;
  dexterity?: number;
  constitution?: number;
  charisma?: number;
  dexterity_save?: number;
  stealth?: number;
  senses?: string;
  languages?: string;
  challenge_rating: string;
  special_abilities?: IAbility[];
  actions?: IAbility[];
  damage_immunities?: string;
  damage_vulnerabilities?: string;
  // EXTEND WITH LEGENDARY STUFF LATER
}

export interface IAbility {
  name: string;
  desc: string;
  attack_bonus: string;
  damage_dice?: string;
}
