import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Player } from "src/app/interfaces/player";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-create-player",
  templateUrl: "./create-player.component.html",
  styleUrls: ["./create-player.component.scss"],
})
export class CreatePlayerComponent implements OnInit {
  @Input() player: Player;

  constructor() {}

  ngOnInit(): void {}

  levelChanged(level: string) {
    this.player.level = parseInt(level);
  }

  nameChanged(name: string) {
    this.player.name = name;
  }
}
