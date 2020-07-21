import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { PlayersService } from "src/app/services/players.service";
import { RandomService } from "src/app/services/random.service";
import { IInitiativeEntity } from "src/app/interfaces/initiative-entity";
import { IMonsterIndex } from "src/app/interfaces/monster-index";

@Component({
  selector: "app-initiative",
  templateUrl: "./initiative.component.html",
  styleUrls: ["./initiative.component.scss"],
})
export class InitiativeComponent implements OnInit {
  constructor(
    public monsterService: MonsterService,
    public playerService: PlayersService,
    public randomService: RandomService
  ) {}

  public initiativeList: IInitiativeEntity[];

  ngOnInit(): void {}

  onInitiativeStart() {
    this.initiativeList = [];
    if (!this.monsterService.currentEncounter) {
      return;
    }
    this.monsterService.currentEncounter.filter((m) => {
      m.initiative =
        this.randomService.GetRandomNumber(1, 20) +
        Math.floor((m.dexterity - 10) / 2);
      this.initiativeList.push({
        name: m.name,
        initiative: m.initiative,
        hitpoints: m.hit_points,
        mosnter: true,
      } as IInitiativeEntity);
    });
    if (!this.playerService.playerList) {
      return;
    }
    this.playerService.playerList.filter((p) => {
      this.initiativeList.push({
        name: p.name,
        initiative: p.initiative,
        player: true,
      } as IInitiativeEntity);
    });
    this.initiativeList.sort((a, b) => {
      return b.initiative - a.initiative;
    });
    this.AddSuffixToDuplicates();
  }

  onNewSelected(monster: string) {
    this.monsterService.GetMonsterDataByName(monster).then((data) => {
      this.monsterService.AddMonster(data[0]);
    });
  }

  onDuplicateMonster(monster: IMonsterIndex) {
    this.monsterService.AddMonster(monster);
  }

  onRemoveMonster(monster: IMonsterIndex) {
    this.monsterService.RemoveMonster(monster);
  }

  AddSuffixToDuplicates() {
    let suffix = 2;
    let hit = false;
    for (let i = 0; i < this.initiativeList.length; i++) {
      for (let j = 0; j < this.initiativeList.length; j++) {
        if (i === j) {
          continue;
        }
        if (this.initiativeList[i].name === this.initiativeList[j].name) {
          this.initiativeList[j].name =
            this.initiativeList[j].name + " " + suffix.toString();
          suffix++;
          hit = true;
        }
      }
      if (!!hit) {
        this.initiativeList[i].name = this.initiativeList[i].name + " 1";
      }
      suffix = 2;
      hit = false;
    }
  }
}
