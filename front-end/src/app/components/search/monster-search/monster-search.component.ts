import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { IMonsterIndex } from "src/app/interfaces/monster-index";

@Component({
  selector: "app-monster-search",
  templateUrl: "./monster-search.component.html",
  styleUrls: ["./monster-search.component.scss"],
})
export class MonsterSearchComponent implements OnInit {
  constructor(public monsterService: MonsterService) {}

  selectedMonster: IMonsterIndex;

  ngOnInit(): void {}

  onNewSelected(monster: string) {
    this.monsterService.GetMonsterDataByName(monster).then((data) => {
      this.selectedMonster = data[0];
    });
  }
}
