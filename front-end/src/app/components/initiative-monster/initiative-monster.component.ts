import { Monster } from "../../interfaces/monster";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-initiative-monster",
  templateUrl: "./initiative-monster.component.html",
  styleUrls: ["./initiative-monster.component.scss"],
})
export class InitiativeMonsterComponent implements OnInit {
  private damageText = "";
  public isTextValid = true;
  @Input() monster: Monster;

  @Output() remove$ = new EventEmitter<Monster>();
  @Output() duplicate$ = new EventEmitter<Monster>();
  @Output() changed$ = new EventEmitter<Monster>();
  @Output() nameClicked$ = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onInitiativeDamageTextChanged(damage: string) {
    this.damageText = damage;
  }

  onDamageDealt() {
    const damage: number = parseInt(this.damageText, 10);
    if (isNaN(damage)) {
      this.isTextValid = false;
      return;
    }
    this.isTextValid = true;
    this.monster.hit_points = this.monster.hit_points - damage;
    if (this.monster.hit_points < 1) {
      this.onRemoveMonster();
    } else {
      this.changed$.emit(this.monster);
    }
  }

  onInitiativeChanged(initiative: string) {
    this.monster.initiative = parseInt(initiative, 10);
    this.changed$.emit(this.monster);
  }

  onRemoveMonster() {
    this.remove$.emit(this.monster);
  }
  onDuplicateMonster() {
    this.duplicate$.emit(this.monster);
  }

  onNameClicked(): void {
    this.nameClicked$.emit();
  }
}
