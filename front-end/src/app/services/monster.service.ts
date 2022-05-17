import { Injectable } from "@angular/core";
import { CrToTable, Monster, MonsterQuickSearch } from "../interfaces/monster";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  public currentEncounter: Monster[];
  public monstersQuickSort: MonsterQuickSearch[];
  public crToXpTable: CrToTable[];
  public monstersMultiplier: JSON;
  public monsterTotal = 1;
  public crList: string[] = [];

  constructor(private http: HttpClient) {
    this.http.get("/api/encounter/crtable").subscribe((data: CrToTable[]) => {
      this.crToXpTable = data;
      for (const prop in this.crToXpTable) {
        if (!!prop) {
          this.crList.push(prop);
        }
      }
      this.crList.shift();
      this.crList.unshift(this.crList[this.crList.length - 1]);
      this.crList.unshift(this.crList[this.crList.length - 2]);
      this.crList.unshift(this.crList[this.crList.length - 3]);
      this.crList.pop();
      this.crList.pop();
      this.crList.pop();
      this.crList.unshift("0");
      this.crList.unshift("any");
    });
    this.http
      .get("/api/encounter/monster/quicksort")
      .subscribe((data: MonsterQuickSearch[]) => {
        this.monstersQuickSort = Object.values(data);
        this.monstersQuickSort.sort((a, b) =>
          ("" + a.name).localeCompare(b.name)
        );
      });
    this.http.get("api/encounter/multiplier").subscribe((data: JSON) => {
      this.monstersMultiplier = data;
    });
    try {
      this.currentEncounter = JSON.parse(localStorage.getItem("monsters"));
    } catch (e) {
      console.log(e);
      this.currentEncounter = [];
    }
  }

  GenerateRandomEncounter(
    monsters: string,
    partyxp: string,
    spread: number,
    origins: string[],
    alignment?: string,
    locations?: string[],
    geolocation?: string
  ): Promise<unknown> {
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
      "&spread=" +
      spread +
      "&origins=" +
      origins.join("-");
    if (!!alignment) {
      apiUrl = apiUrl + "&alignment=" + alignment;
    }
    if (!!locations) {
      apiUrl = apiUrl + "&locations=" + locations.join("-");
    }
    const promise = new Promise((resolve, reject) => {
      this.http.get<Monster[]>(apiUrl).subscribe((r) => {
        Object.assign(this.currentEncounter, r);
        this.InitializeNewMonsters();
        localStorage.setItem("monsters", JSON.stringify(this.currentEncounter));
        resolve("");
      });
    });
    return promise;
  }

  GetMonsterDataByName(monster: string): Promise<Monster> {
    if (!monster) {
      console.log("Missing parameters for request");
      return;
    }
    return this.http
      .get<Monster>("/api/encounter/monster?name=" + monster)
      .toPromise();
  }

  AddMonster(newMonster: Monster): void {
    const monster = Object.assign({}, newMonster);
    monster.initiative = 0;
    monster.max_hit_points = !!newMonster.max_hit_points
      ? newMonster.max_hit_points
      : monster.hit_points;
    this.currentEncounter.push(monster);
    this.monsterTotal = this.currentEncounter.length;
    this.AddSuffixToDuplicates();
    localStorage.setItem("monsters", JSON.stringify(this.currentEncounter));
  }
  RemoveMonster(monster: Monster): void {
    this.currentEncounter.splice(this.currentEncounter.indexOf(monster), 1);
    this.monsterTotal = this.currentEncounter.length;
    localStorage.setItem("monsters", JSON.stringify(this.currentEncounter));
  }

  InitializeNewMonsters() {
    this.currentEncounter.forEach((m) => {
      m.initiative = 0;
      m.max_hit_points = m.hit_points;
    });
    this.monsterTotal = this.currentEncounter.length;
    this.AddSuffixToDuplicates();
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
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return a.initiative_suffix - b.initiative_suffix;
    });
  }

  GetMonsterMultiplier(xp: number): number {
    return Math.round(
      xp /
        this.monstersMultiplier[
          this.monsterTotal > 0
            ? this.monsterTotal > 15
              ? 15
              : this.monsterTotal
            : 1
        ]
    );
  }

  GetMonsterNames(): string[] {
    return this.monstersQuickSort.map((m) => m.name);
  }
}
