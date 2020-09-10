import { ISpell } from "./../interfaces/spell";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpellService {
  public spellNames: string[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get("/api/spellbook/names").subscribe((data: JSON) => {
      this.spellNames = Object.values(data);
    });
  }

  GetMonsterDataByName(spellName: string): Promise<ISpell> {
    if (!spellName) {
      console.log("Missing parameters for request");
      return;
    }
    return this.httpClient
      .get<ISpell>("/api/spellbook/spell?name=" + spellName)
      .toPromise();
  }
}
