import { MonsterService } from "src/app/services/monster.service";
import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-create-player-wrapper",
  templateUrl: "./create-player-wrapper.component.html",
  styleUrls: ["./create-player-wrapper.component.scss"],
})
export class CreatePlayerWrapperComponent implements OnInit {
  constructor(
    public playerSerivce: PlayersService,
    public MonsterService: MonsterService
  ) {}

  ngOnInit(): void {}

  onPlayerAdd() {
    this.playerSerivce.AddNewPlayer();
  }

  onPlayerRemove() {
    if (!!this.playerSerivce.playerList) {
      this.playerSerivce.playerList.pop();
    }
    this.playerSerivce.CalculateEncounterDifficulty();
  }

  onPlayerChanged() {
    this.playerSerivce.CalculateEncounterDifficulty();
  }

  onSave() {
    // TODO
    // EITHER SAVE TO FUTURE DB OR LOCALSTORE IN BROWSER
  }
}
