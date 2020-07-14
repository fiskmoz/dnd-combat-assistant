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
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  damage_vulnerabilities?: string;
  damage_resistances?: string;
  damage_immunities?: string;
  condition_immunities?: string;
  senses?: string;
  languages?: string;
  challenge_rating: string;
  special_abilities?: IAbility[];
  actions?: IAbility[];
  legendary_desc?: string;
  legendary_actions?: IAbility[];
  spells?: string[];

  initiative?: number;
  img_url?: string;
  // EXTEND WITH LEGENDARY STUFF LATER
}

export interface IAbility {
  name: string;
  desc: string;
  attack_bonus: string;
  damage_dice?: string;
}
