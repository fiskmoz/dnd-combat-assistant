import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { Monster } from "src/app/interfaces/monster";

@Component({
  selector: "app-monster-search",
  templateUrl: "./monster-search.component.html",
  styleUrls: ["./monster-search.component.scss"],
})
export class MonsterSearchComponent implements OnInit {
  public localMonsterList: string[] = [];
  public crRequirement = "any";
  constructor(public monsterService: MonsterService) {}

  selectedMonster: Monster;

  ngOnInit(): void {}

  onNewSelected(monster: string) {
    this.monsterService.GetMonsterDataByName(monster).then((data) => {
      this.selectedMonster = data[0];
    });
  }

  onCrRequirementChange(target: string): void {
    this.crRequirement = target;
    this.setAvalibleMonsters();
  }

  setAvalibleMonsters(): void {
    this.crRequirement === "any"
      ? (this.localMonsterList = this.monsterService.monstersQuickSort.map(
          (m) => m.name
        ))
      : (this.localMonsterList = this.monsterService.monstersQuickSort
          .filter((s) => s.challenge_rating === this.crRequirement)
          .map((s) => s.name));
  }

  IsInitialized(): boolean {
    if (!!this.monsterService.monstersQuickSort) {
      if (!this.localMonsterList.length) {
        this.setAvalibleMonsters();
      }
      return true;
    }
    return false;
  }
}
