import { Component, OnInit } from "@angular/core";
import { Condition } from "src/app/interfaces/condition";
import { Weapon } from "src/app/interfaces/weapons";
import { StaticDataService } from "src/app/services/static-data.service";

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.scss"],
})
export class SearchViewComponent implements OnInit {
  public active = "monster";
  public selectedCondition = null;
  public selectedWeapon = null;
  constructor(public staticDataService: StaticDataService) {}

  ngOnInit(): void {}

  get conditionNames(): string[] {
    return this.staticDataService.conditions.map((c) => c.name);
  }
  get weaponNames(): string[] {
    return this.staticDataService.weapons.map((c) => c.name);
  }

  get specificSelectedCondition(): Condition {
    return this.staticDataService.conditions.find(
      (c) => c.name === this.selectedCondition
    );
  }
  get specificSelectedWeapon(): Weapon {
    return this.staticDataService.weapons.find(
      (c) => c.name === this.selectedWeapon
    );
  }
}
