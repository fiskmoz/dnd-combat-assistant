import { IMonsterIndex } from "./../../interfaces/monster-index";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { typeWithParameters } from "@angular/compiler/src/render3/util";

@Component({
  selector: "app-initiative-monster",
  templateUrl: "./initiative-monster.component.html",
  styleUrls: ["./initiative-monster.component.scss"],
})
export class InitiativeMonsterComponent implements OnInit {
  private damageText: string = "";
  public isTextValid: boolean = true;
  @Input() monster: IMonsterIndex;

  @Output() remove$ = new EventEmitter<IMonsterIndex>();
  @Output() duplicate$ = new EventEmitter<IMonsterIndex>();
  @Output() changed$ = new EventEmitter<IMonsterIndex>();
  constructor() {}

  ngOnInit(): void {}

  onInitiativeDamageTextChanged(damage: string) {
    this.damageText = damage;
  }

  onDamageDealt() {
    let damage: number = parseInt(this.damageText);
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
    this.monster.initiative = parseInt(initiative);
    this.changed$.emit(this.monster);
  }

  onRemoveMonster() {
    this.remove$.emit(this.monster);
  }
  onDuplicateMonster() {
    this.duplicate$.emit(this.monster);
  }
}
