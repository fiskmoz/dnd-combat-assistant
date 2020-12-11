import { Component, Input, OnInit } from "@angular/core";
import { Weapon } from "src/app/interfaces/weapons";

@Component({
  selector: "app-weapon-card",
  templateUrl: "./weapon-card.component.html",
  styleUrls: ["./weapon-card.component.scss"],
})
export class WeaponCardComponent implements OnInit {
  @Input() weapon: Weapon;
  constructor() {}

  ngOnInit(): void {}
}
