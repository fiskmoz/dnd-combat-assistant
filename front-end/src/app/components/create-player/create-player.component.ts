import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Player } from "src/app/interfaces/player";

@Component({
  selector: "app-create-player",
  templateUrl: "./create-player.component.html",
  styleUrls: ["./create-player.component.scss"],
})
export class CreatePlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() initiative: boolean;

  @Output() playerChanged$ = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  levelChanged(level: string) {
    this.player.level = parseInt(level);
    this.playerChanged$.emit();
  }

  nameChanged(name: string) {
    this.player.name = name;
    this.playerChanged$.emit();
  }

  initiativeChanged(init: string) {
    this.player.initiative = parseInt(init);
    this.playerChanged$.emit();
  }
}
