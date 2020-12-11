import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Monster } from "src/app/interfaces/monster";

@Component({
  selector: "app-monster-card",
  templateUrl: "./monster-card.component.html",
  styleUrls: ["./monster-card.component.scss"],
})
export class MonsterCardComponent implements OnInit {
  @Input() monster: Monster;
  @Input() crToXPTable: JSON;
  @Input() enableOptions: boolean;
  @Input() id: number;

  @Output() remove$ = new EventEmitter<Monster>();
  @Output() duplicate$ = new EventEmitter<Monster>();

  constructor() {}

  ngOnInit(): void {}

  onRemoveMonster() {
    this.remove$.emit(this.monster);
  }
  onDuplicateMonster() {
    this.duplicate$.emit(this.monster);
  }
}
