import { Spell, SpellQuickSearch } from "./../interfaces/spell";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpellService {
  public spellsQuickSort: SpellQuickSearch[];
  public levels: string[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get("/api/spellbook/quicksort").subscribe((data: JSON) => {
      this.spellsQuickSort = Object.values(data);
      this.levels = [
        ...new Set(this.spellsQuickSort.map((s) => s.level)),
      ].sort();
      this.levels.unshift(this.levels[this.levels.length - 1]);
      this.levels.pop();
      this.levels.unshift("any");
    });
  }

  GetMonsterDataByName(spellName: string): Promise<Spell> {
    if (!spellName) {
      console.log("Missing parameters for request");
      return;
    }
    return this.httpClient
      .get<Spell>("/api/spellbook/spell?name=" + spellName)
      .toPromise();
  }
}
