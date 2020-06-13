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

  ngOnInit(): void {}
  onRandomEncounter() {
    this.monsterService.GenerateRandomEncounter(
      "2",
      this.playerService.mediumEncounter.toString(),
      this.origins,
      null,
      null
    );
  }

  refChange(event: ICheckboxChangeEvent) {
    if (event.checked && this.origins.indexOf(event.name) === -1) {
      this.origins.push(event.name);
    } else {
      this.origins = this.origins.filter((o) => o !== event.name);
    }
  }
}
