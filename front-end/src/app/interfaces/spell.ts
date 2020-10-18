export interface Spell {
  casting_time: string;
  classes: string[];
  components: {
    material: boolean;
    materials_needed?: string[];
    raw: string;
    somatic: true;
    verbal: true;
  };
  description: string;
  duration: string;
  level: string;
  name: string;
  range: string;
  ritual: boolean;
  tags: string[];
  type: string;
  school: string;
}

export interface SpellQuickSearch {
  name: string;
  level: string;
  classes: string[];
}
