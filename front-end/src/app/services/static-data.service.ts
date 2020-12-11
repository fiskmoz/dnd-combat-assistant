import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Condition } from "../interfaces/condition";
import { Weapon } from "../interfaces/weapons";

@Injectable({
  providedIn: "root",
})
export class StaticDataService {
  public weapons: Weapon[] = null;
  public conditions: Condition[] = null;

  constructor(private http: HttpClient) {
    this.http.get<Weapon[]>("/api/data/weapons").subscribe((resp: Weapon[]) => {
      this.weapons = resp;
    });
    this.http
      .get<Condition[]>("/api/data/conditions")
      .subscribe((resp: Condition[]) => {
        this.conditions = resp;
      });
  }
}
