import { Component, OnInit, Input } from "@angular/core";
import { Spell } from "src/app/interfaces/spell";

@Component({
  selector: "app-spell-card",
  templateUrl: "./spell-card.component.html",
  styleUrls: ["./spell-card.component.scss"],
})
export class SpellCardComponent implements OnInit {
  @Input() spell: Spell;
  constructor() {}

  ngOnInit(): void {}
}
