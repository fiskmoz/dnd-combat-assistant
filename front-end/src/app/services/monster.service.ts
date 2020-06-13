import { Injectable } from "@angular/core";
import { IMonsterIndex } from "../interfaces/monster-index";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  public currentEncounter: IMonsterIndex[];
  constructor(private http: HttpClient) {}

  GenerateRandomEncounter(
    monsters: string,
    partyxp: string,
    origins: string[],
    alignment?: string,
    location?: string
  ) {
    if (!monsters || !partyxp || !origins || origins.length === 0) {
      console.log("Missing parameters for request");
      return;
    }

    this.currentEncounter = [];
    let apiUrl =
      "/api/encounters/generate?monsters=" +
      monsters +
      "&partyxp=" +
      partyxp +
      "&origins=" +
      origins.join("-");
    if (!!alignment) {
      apiUrl = apiUrl + "&alignment=" + alignment;
    }
    if (!!location) {
      apiUrl = apiUrl + "&location=" + location;
    }
    this.http.get<IMonsterIndex[]>(apiUrl).subscribe((r) => {
      Object.assign(this.currentEncounter, r);
    });
  }
}