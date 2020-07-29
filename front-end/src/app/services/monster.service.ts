import { Injectable } from "@angular/core";
import { IMonsterIndex } from "../interfaces/monster-index";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  public currentEncounter: IMonsterIndex[];
  public monsterNames: string[];
  public crToXpTable: JSON;

  constructor(private http: HttpClient) {
    this.http.get("/api/encounter/crtable").subscribe((data: JSON) => {
      this.crToXpTable = data;
    });
    this.http.get("/api/encounter/names").subscribe((data: JSON) => {
      this.monsterNames = Object.values(data);
    });
    this.currentEncounter = [];
  }

  GenerateRandomEncounter(
    monsters: string,
    partyxp: string,
    origins: string[],
    alignment?: string,
    locations?: string[],
    geolocation?: string
  ) {
    if (!monsters || !partyxp || !origins || origins.length === 0) {
      console.log("Missing parameters for request");
      return;
    }

    this.currentEncounter = [];
    let apiUrl =
      "/api/encounter/generate?monsters=" +
      monsters +
      "&partyxp=" +
      partyxp +
      "&geolocation=" +
      geolocation +
      "&origins=" +
      origins.join("-");
    if (!!alignment) {
      apiUrl = apiUrl + "&alignment=" + alignment;
    }
    if (!!locations) {
      apiUrl = apiUrl + "&locations=" + locations.join("-");
    }
    this.http.get<IMonsterIndex[]>(apiUrl).subscribe((r) => {
      Object.assign(this.currentEncounter, r);
    });
  }

  GetMonsterDataByName(monster: string): Promise<IMonsterIndex> {
    if (!monster) {
      console.log("Missing parameters for request");
      return;
    }
    return this.http
      .get<IMonsterIndex>("/api/encounter/monster?name=" + monster)
      .toPromise();
  }

  AddMonster(monster: IMonsterIndex): void {
    this.currentEncounter.push(Object.assign({}, monster));
  }
  RemoveMonster(monster: IMonsterIndex): void {
    this.currentEncounter.splice(this.currentEncounter.indexOf(monster), 1);
  }

  AddSuffixToDuplicates(): void {
    let suffix = 2;
    let hit = false;
    for (let i = 0; i < this.currentEncounter.length; i++) {
      for (let j = 0; j < this.currentEncounter.length; j++) {
        if (i === j) {
          continue;
        }
        if (this.currentEncounter[i].name === this.currentEncounter[j].name) {
          this.currentEncounter[j].initiative_suffix = suffix;
          suffix++;
          hit = true;
        }
      }
      if (!!hit) {
        this.currentEncounter[i].initiative_suffix = 1;
      }
      suffix = 2;
      hit = false;
    }
    this.currentEncounter.sort((a, b) => {
      return a.initiative_suffix - b.initiative_suffix;
    });
  }
}
