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

  ngOnInit(): void {
    this.initiativeList = [];
    this.RefreshIniativeState();
  }

  onInitiativeStart() {
    this.initiativeList = [];
    if (!this.monsterService.currentEncounter) {
      return;
    }
    this.monsterService.currentEncounter.forEach((m, index) => {
      this.monsterService.currentEncounter[index].initiative =
        this.randomService.GetRandomNumber(1, 20) +
        Math.floor((m.dexterity - 10) / 2);
    });

    if (!this.playerService.playerList) {
      return;
    }

    this.RefreshIniativeState();
  }

  onPlayerChanged() {
    this.playerService.UpdateLocalStorage();
    this.RefreshIniativeState();
  }

  onMonsterChanged(monster: IMonsterIndex) {
    this.RefreshIniativeState();
  }

  onNewSelected(monster: string) {
    this.monsterService.GetMonsterDataByName(monster).then((data) => {
      this.monsterService.AddMonster(data[0]);
      this.RefreshIniativeState();
    });
  }

  onDuplicateMonster(monster: IMonsterIndex) {
    this.monsterService.AddMonster(monster);
    this.RefreshIniativeState();
  }

  onRemoveMonster(monster: IMonsterIndex) {
    this.monsterService.RemoveMonster(monster);
    this.RefreshIniativeState();
  }

  RefreshIniativeState() {
    this.initiativeList = [];
    this.monsterService.currentEncounter.forEach((m, index) => {
      this.initiativeList.push({
        name: m.name,
        id: index + 1,
        initiative: m.initiative,
        hitpoints: m.hit_points,
        monster: true,
        suffix: !!m.initiative_suffix ? m.initiative_suffix : null,
      } as IInitiativeEntity);
    });
    this.playerService.playerList.forEach((p) => {
      this.initiativeList.push({
        name: p.name,
        initiative: p.initiative,
        player: true,
      } as IInitiativeEntity);
    });
    this.initiativeList.sort((a, b) => {
      return b.initiative - a.initiative;
    });
  }
}
