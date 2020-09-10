import { ISpell } from "./../../../interfaces/spell";
import { SpellService } from "./../../../services/spell.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-spell-search",
  templateUrl: "./spell-search.component.html",
  styleUrls: ["./spell-search.component.scss"],
})
export class SpellSearchComponent implements OnInit {
  public selectedSpell: ISpell;

  constructor(public spellService: SpellService) {}

  ngOnInit(): void {}

  onSpellSelect(spell: string): void {
    this.spellService.GetMonsterDataByName(spell).then((data) => {
      this.selectedSpell = data[0];
    });
  }
}
