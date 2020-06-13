import { Component, OnInit, Input } from "@angular/core";
import { IMonsterIndex } from "src/app/interfaces/monster-index";

@Component({
  selector: "app-monster-card",
  templateUrl: "./monster-card.component.html",
  styleUrls: ["./monster-card.component.scss"],
})
export class MonsterCardComponent implements OnInit {
  @Input() monster: IMonsterIndex;
  constructor() {}

  ngOnInit(): void {}
}
