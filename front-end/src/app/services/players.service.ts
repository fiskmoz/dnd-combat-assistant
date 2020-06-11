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
  public easyEncounter = 0;
  public mediumEncounter = 0;
  public hardEncounter = 0;
  public deadlyEncounter = 0;

  constructor(private http: HttpClient) {}

  CalculateEncounterDifficulty() {
    this.SetPlayerXPthreshhold();
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
    this.easyEncounter = totalEasyEncounterXp;
    this.mediumEncounter = totalMediumEncounterXp;
    this.hardEncounter = totalHardEncounterXp;
    this.deadlyEncounter = totalDeadlyEncounterXp;
  }

  SetPlayerXPthreshhold() {
    if (!this.playerList) {
      console.log("failed to set player xp threshhold");
      return;
    }
    this.playerList.forEach((player: Player) => {
      player.xpthreshhold = this.playerXpTable["levels"][player.level];
    });
  }

  AddNewPlayer() {
    const mrDefault = {
      level: 1,
      name: "mrs default",
    } as Player;
    if (!this.playerList) {
      this.playerList = [mrDefault];
    } else {
      this.playerList.push(mrDefault);
    }
    this.SetPlayerXPthreshhold();
    this.CalculateEncounterDifficulty();
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
