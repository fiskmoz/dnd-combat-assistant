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
  @Output() playerRemoved$ = new EventEmitter();
  @Output() playerDuplicated$ = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  levelChanged(level: string): void {
    this.player.level = parseInt(level);
    this.playerChanged$.emit();
  }

  nameChanged(name: string): void {
    this.player.name = name;
    this.playerChanged$.emit();
  }

  initiativeChanged(init: string): void {
    this.player.initiative = parseInt(init);
    this.playerChanged$.emit();
  }

  onDuplicatePlayer(): void {
    this.playerDuplicated$.emit();
  }
  onPlayerRemove(): void {
    this.playerRemoved$.emit();
  }
}
