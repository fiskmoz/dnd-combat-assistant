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
}
