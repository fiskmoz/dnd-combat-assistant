import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { PlayersService } from "src/app/services/players.service";
import { ICheckboxChangeEvent } from "src/app/interfaces/checkbox-change";

@Component({
  selector: "app-create-encounter",
  templateUrl: "./create-encounter.component.html",
  styleUrls: ["./create-encounter.component.scss"],
})
export class CreateEncounterComponent implements OnInit {
  constructor(
    public monsterService: MonsterService,
    private playerService: PlayersService
  ) {}

  origins = ["SRD"];
  locations = [
    "city",
    "village",
    "mountain",
    "sea",
    "sky",
    "cave",
    "plain",
    "desert",
    "frostlands",
    "swamp",
    "forrest",
    "underdark",
  ];
  monsterTotal = "1";
  difficulty = "easy";

  ngOnInit(): void {}
  onRandomEncounter() {
    this.monsterService.GenerateRandomEncounter(
      this.monsterTotal,
      this.playerService.GetEncounterDifficulty(this.difficulty),
      this.origins,
      null,
      this.locations
    );
  }

  refChange(event: ICheckboxChangeEvent) {
    if (event.checked && this.origins.indexOf(event.name) === -1) {
      this.origins.push(event.name);
    } else {
      this.origins = this.origins.filter((o) => o !== event.name);
    }
  }

  locationChange(event: ICheckboxChangeEvent) {
    if (event.checked && this.locations.indexOf(event.name) === -1) {
      this.locations.push(event.name);
    } else {
      this.locations = this.locations.filter((o) => o !== event.name);
    }
  }
  monsterTotalChange(event: string) {
    this.monsterTotal = event;
  }
  encounterDifficultyChange(event: string) {
    this.difficulty = event;
  }
}
