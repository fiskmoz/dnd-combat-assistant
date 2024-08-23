import { Component, OnInit } from "@angular/core";
import { Player } from "src/app/interfaces/player";

@Component({
  selector: "app-npc-generator",
  templateUrl: "./npc-generator.component.html",
})
export class NpcGeneratorComponent implements OnInit {
  player: Player | null = null;
  constructor() {}

  ngOnInit(): void {
    this.player = {
      name: "Npc",
      level: 1,
      class: "Npc",
      race: "Npc",
      constitution: 10,
      charisma: 10,
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
    };
  }

  generateNewNpc(text: string): void {
    this.player = {
      name: "Npc",
      level: 1,
      class: "Npc",
      race: "Npc",
      constitution: 10,
      charisma: 10,
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
    };
  }
}
