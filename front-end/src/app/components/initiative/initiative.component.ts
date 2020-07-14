import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { PlayersService } from "src/app/services/players.service";
import { RandomService } from "src/app/services/random.service";
import { IInitiativeEntity } from "src/app/interfaces/initiative-entity";

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
      } as IInitiativeEntity);
    });
    if (!this.playerService.playerList) {
      return;
    }
    this.playerService.playerList.filter((p) => {
      this.initiativeList.push({
        name: p.name,
        initiative: p.initiative,
      } as IInitiativeEntity);
    });
    this.initiativeList.sort((a, b) => {
      return b.initiative - a.initiative;
    });
  }
}
