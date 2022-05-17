import { Injectable } from "@angular/core";
import { Player, PlayerXpRow, PlayerXpTable } from "../interfaces/player";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlayersService {
  public playerList: Player[];
  public playerXpTable: PlayerXpTable = {
    levels: [],
  };
  public easyEncounter = 0;
  public mediumEncounter = 0;
  public hardEncounter = 0;
  public deadlyEncounter = 0;

  constructor(private http: HttpClient) {
    this.ReadLocalStorage();
    this.http.get("/api/encounter/thresholds").subscribe((data: JSON) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.playerXpTable.levels[key] = {
            easy: data[key].easy,
            medium: data[key].medium,
            hard: data[key].hard,
            deadly: data[key].deadly,
          } as PlayerXpRow;
        }
      }
      this.CalculateEncounterDifficulty();
    });
  }

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
    this.UpdateLocalStorage();
  }

  SetPlayerXPthreshhold() {
    if (!this.playerList) {
      this.AddNewPlayer();
      return;
    }
    this.playerList.forEach((player: Player) => {
      player.xpthreshhold = this.playerXpTable.levels[player.level];
    });
  }

  AddNewPlayer(player?: Player) {
    if (!!player) {
      this.playerList.push(Object.assign({}, player));
    } else {
      const mrDefault = {
        level: 1,
        name: "mrs default",
      } as Player;
      if (!this.playerList) {
        this.playerList = [mrDefault];
      } else {
        this.playerList.push(mrDefault);
      }
    }

    this.SetPlayerXPthreshhold();
    this.CalculateEncounterDifficulty();
    this.UpdateLocalStorage();
  }

  RemovePlayer(player: Player) {
    this.playerList = this.playerList.filter((p) => p !== player);
    this.SetPlayerXPthreshhold();
    this.CalculateEncounterDifficulty();
    this.UpdateLocalStorage();
  }

  GetEncounterDifficulty(difficulty: string): string {
    switch (difficulty) {
      case "easy":
        return this.easyEncounter.toString();
      case "medium":
        return this.mediumEncounter.toString();
      case "hard":
        return this.hardEncounter.toString();
      case "deadly":
        return this.deadlyEncounter.toString();
      default:
        console.log("String format incorrect");
    }
  }

  public UpdateLocalStorage() {
    localStorage.setItem(
      "player_service_data",
      JSON.stringify({
        playerList: this.playerList,
      })
    );
  }

  private ReadLocalStorage() {
    let storageJson = localStorage.getItem("player_service_data");
    if (!storageJson) {
      return;
    }
    storageJson = JSON.parse(storageJson);
    if (!!storageJson.hasOwnProperty("playerList")) {
      this.playerList = (storageJson as any).playerList;
    }
  }
}
