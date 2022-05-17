import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Monster } from "src/app/interfaces/monster";

@Component({
  selector: "app-initiative-monster",
  templateUrl: "./initiative-monster.component.html",
  styleUrls: ["./initiative-monster.component.scss"],
})
export class InitiativeMonsterComponent implements OnInit {
  public damageText = "";
  public isTextValid = true;
  @Input() monster: Monster;

  @Output() remove$ = new EventEmitter<Monster>();
  @Output() duplicate$ = new EventEmitter<Monster>();
  @Output() changed$ = new EventEmitter<Monster>();
  @Output() nameClicked$ = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onInitiativeDamageTextChanged(damage: string): void {
    this.damageText = damage;
  }

  onDamageDealt(): void {
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
      this.damageText = "";
      this.changed$.emit(this.monster);
    }
  }

  onDamageHeal(): void {
    const damage: number = parseInt(this.damageText, 10);
    if (isNaN(damage)) {
      this.isTextValid = false;
      return;
    }
    this.isTextValid = true;
    this.monster.hit_points = this.monster.hit_points + damage;
    this.damageText = "";
    this.changed$.emit(this.monster);
  }

  onInitiativeChanged(initiative: string): void {
    this.monster.initiative = parseInt(initiative, 10);
    this.changed$.emit(this.monster);
  }

  onRemoveMonster(): void {
    this.remove$.emit(this.monster);
  }
  onDuplicateMonster(): void {
    this.duplicate$.emit(this.monster);
  }

  onNameClicked(): void {
    this.nameClicked$.emit();
  }
}
