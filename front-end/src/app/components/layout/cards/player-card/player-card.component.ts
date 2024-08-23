import { Component, Input, OnInit } from "@angular/core";
import { Player } from "src/app/interfaces/player";

@Component({
  selector: "app-player-card",
  templateUrl: "./player-card.component.html",
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  constructor() {}

  ngOnInit(): void {}
}
