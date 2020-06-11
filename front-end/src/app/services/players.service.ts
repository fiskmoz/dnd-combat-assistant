import { Injectable } from "@angular/core";
import { Player } from "../interfaces/player";
import { IPlayerXpTable, IPlayerXpRow } from "../interfaces/player-xp-table";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlayersService {
  public playerList: Player[];
  public playerXpTable: IPlayerXpTable = {
    levels: [],
  };
  public easyEncounter: number;
  public mediumEncounter: number;
  public hardEncounter: number;
  public deadlyEncounter: number;

  constructor(private http: HttpClient) {}

  CalculateEncounterDifficulty(): IPlayerXpRow {
    let totalEasyEncounterXp = 0;
    let totalMediumEncounterXp = 0;
    let totalHardEncounterXp = 0;
    let totalDeadlyEncounterXp = 0;
    this.playerList.forEach((player: Player) => {
      totalEasyEncounterXp += player.xpthreshhold.easy;
      totalMediumEncounterXp += player.xpthreshhold.medium;
      totalHardEncounterXp += player.xpthreshhold.hard;
      totalDeadlyEncounterXp += player.xpthreshhold.deadly;
    });
    return {
      easy: totalEasyEncounterXp,
      medium: totalMediumEncounterXp,
      hard: totalHardEncounterXp,
      deadly: totalDeadlyEncounterXp,
    } as IPlayerXpRow;
  }

  SetPlayerXPthreshhold() {
    if (!this.playerList) {
      return;
    }
    this.playerList.forEach((player: Player) => {
      player.xpthreshhold = this.playerXpTable[player.level];
    });
  }

  AddNewPlayer() {
    const mrDefault = {
      level: 1,
      name: "mrs default",
    } as Player;
    if (!this.playerList) {
      this.playerList = [mrDefault];
      return;
    }
    this.playerList.push(mrDefault);
  }

  init() {
    this.http.get("/api/encounter/thresholds").subscribe((data: JSON) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.playerXpTable.levels[key] = {
            easy: data[key].easy,
            medium: data[key].medium,
            hard: data[key].hard,
            deadly: data[key].deadly,
          } as IPlayerXpRow;
        }
      }
      this.SetPlayerXPthreshhold();
    });
  }
}
