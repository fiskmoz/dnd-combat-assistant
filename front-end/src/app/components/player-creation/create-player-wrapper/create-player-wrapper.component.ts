import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-create-player-wrapper",
  templateUrl: "./create-player-wrapper.component.html",
  styleUrls: ["./create-player-wrapper.component.scss"],
})
export class CreatePlayerWrapperComponent implements OnInit {
  constructor(public playerSerivce: PlayersService) {}

  ngOnInit(): void {}

  onPlayerAdd() {
    this.playerSerivce.AddNewPlayer();
    console.log(this.playerSerivce.playerList);
  }

  onPlayerRemove() {
    if (!!this.playerSerivce.playerList) {
      this.playerSerivce.playerList.pop();
    }
  }
}
