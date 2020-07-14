import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IMonsterIndex } from "src/app/interfaces/monster-index";

@Component({
  selector: "app-monster-card",
  templateUrl: "./monster-card.component.html",
  styleUrls: ["./monster-card.component.scss"],
})
export class MonsterCardComponent implements OnInit {
  @Input() monster: IMonsterIndex;
  @Input() crToXPTable: JSON;
  @Input() initiative: boolean;
  @Input() enableOptions: boolean;

  @Output() remove$ = new EventEmitter<IMonsterIndex>();
  @Output() duplicate$ = new EventEmitter<IMonsterIndex>();

  constructor() {}

  ngOnInit(): void {}

  initiativeChanged(init: string) {
    this.monster.initiative = parseInt(init);
  }

  onRemoveMonster() {
    this.remove$.emit(this.monster);
  }
  onDuplicateMonster() {
    this.duplicate$.emit(this.monster);
  }
}
