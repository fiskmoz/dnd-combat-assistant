export interface Monster {
  name: string;
  size: string;
  type: string;
  subtype?: string;
  alignment: string;
  armor_class: number;
  max_hit_points: number;
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
  special_abilities?: Ability[];
  actions?: Ability[];
  legendary_desc?: string;
  legendary_actions?: Ability[];
  spells?: string[];
  index?: number;
  prio?: number;

  initiative?: number;
  img_url?: string;
  initiative_suffix?: number;
  // EXTEND WITH LEGENDARY STUFF LATER
}

export interface Ability {
  name: string;
  desc: string;
  attack_bonus: string;
  damage_dice?: string;
}

export interface MonsterQuickSearch {
  name: string;
  type: string;
  challenge_rating: string;
}

export interface CrToTable {
  cr: string;
}
