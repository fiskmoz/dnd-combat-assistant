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
    public playerService: PlayersService,
    public monsterService: MonsterService
  ) {}

  ngOnInit(): void {}

  onPlayerAdd() {
    this.playerService.AddNewPlayer();
  }

  onPlayerRemove() {
    if (!!this.playerService.playerList) {
      this.playerService.playerList.pop();
    }
    this.playerService.CalculateEncounterDifficulty();
  }

  onPlayerChanged() {
    this.playerService.CalculateEncounterDifficulty();
  }

  onSave() {
    // TODO
    // EITHER SAVE TO FUTURE DB OR LOCALSTORE IN BROWSER
  }
}
