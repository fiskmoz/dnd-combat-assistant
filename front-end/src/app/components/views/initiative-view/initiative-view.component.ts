import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { PlayersService } from "src/app/services/players.service";
import { RandomService } from "src/app/services/random.service";
import { InitiativeEntity } from "src/app/interfaces/initiative";
import { Monster } from "src/app/interfaces/monster";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-initiative",
  templateUrl: "./initiative-view.component.html",
  styleUrls: ["./initiative-view.component.scss"],
})
export class InitiativeViewComponent implements OnInit {
  constructor(
    public monsterService: MonsterService,
    public playerService: PlayersService,
    public randomService: RandomService,
    private modalService: NgbModal,
    private themeService: ThemeService
  ) {}

  public initiativeList: InitiativeEntity[];

  public modalMonster: Monster;

  ngOnInit(): void {
    this.initiativeList = [];
    this.RefreshIniativeState();
  }

  openModal(content: any, name: string): void {
    this.modalMonster = this.monsterService.currentEncounter.find(
      (m) => m.name === name
    );
    this.modalService.open(content, {
      ariaLabelledBy: "modal",
      windowClass: this.themeService.mode,
    });
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  onInitiativeStart(): void {
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

  onPlayerChanged(): void {
    this.playerService.UpdateLocalStorage();
    this.RefreshIniativeState();
  }

  onMonsterChanged(_monster: Monster): void {
    this.RefreshIniativeState();
  }

  onNewSelected(monster: string): void {
    this.monsterService.GetMonsterDataByName(monster).then((data) => {
      this.monsterService.AddMonster(data[0]);
      this.RefreshIniativeState();
    });
  }

  onDuplicateMonster(monster: Monster): void {
    this.monsterService.AddMonster(monster);
    this.RefreshIniativeState();
  }

  onRemoveMonster(monster: Monster): void {
    this.monsterService.RemoveMonster(monster);
    this.RefreshIniativeState();
  }

  RefreshIniativeState(): void {
    this.initiativeList = [];
    this.monsterService.currentEncounter.forEach((m, index) => {
      m.index = index + 1;
      this.initiativeList.push({
        name: m.name,
        id: index + 1,
        initiative: !!m.initiative ? m.initiative : 0,
        initiative_duplicate: false,
        hitpoints: m.hit_points,
        priority: !!m.prio ? m.prio : 0,
        monster: true,
        suffix: !!m.initiative_suffix ? m.initiative_suffix : null,
      } as InitiativeEntity);
    });
    const prevLen = this.initiativeList.length;
    this.playerService.playerList.forEach((p, index) => {
      this.initiativeList.push({
        name: p.name,
        id: prevLen + index,
        initiative: !!p.initiative ? p.initiative : 0,
        initiative_duplicate: false,
        priority: !!p.prio ? p.prio : 0,
        player: true,
      } as InitiativeEntity);
    });
    this.DetermineInitiativeDuplicates();
    this.SortInitiative();
    this.SortPriority();
  }

  IncreasePrio(entity: InitiativeEntity): void {
    const enty = !!entity.monster
      ? this.monsterService.currentEncounter.find((m) => m.index == entity.id)
      : this.playerService.playerList.find((p) => p.name === entity.name);
    !!enty.prio ? enty.prio++ : (enty.prio = 1);
    this.initiativeList.find((i) => i === entity).priority++;
    this.SortPriority();
  }

  SortInitiative(): void {
    this.initiativeList.sort((a, b) => b.initiative - a.initiative);
  }
  DetermineInitiativeDuplicates(): void {
    this.initiativeList.forEach((ii) => {
      this.initiativeList.forEach((i) => {
        if (i.id !== ii.id) {
          if (ii.initiative == i.initiative) {
            ii.initiative_duplicate = true;
          }
        }
      });
    });
  }

  SortPriority(): void {
    this.initiativeList.sort((a, b) => {
      if (b.priority === a.priority || b.initiative !== a.initiative) {
        return 0;
      }
      return b.priority - a.priority;
    });
  }
}
