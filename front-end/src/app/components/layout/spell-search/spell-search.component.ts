import { Spell } from "./../../../interfaces/spell";
import { SpellService } from "./../../../services/spell.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-spell-search",
  templateUrl: "./spell-search.component.html",
  styleUrls: ["./spell-search.component.scss"],
})
export class SpellSearchComponent implements OnInit {
  public selectedSpell: Spell;
  public levelrequirement = -1;
  public localSpellList: string[] = [];

  constructor(public spellService: SpellService) {}

  ngOnInit(): void {}

  onSpellSelect(spell: string): void {
    this.spellService.GetMonsterDataByName(spell).then((data) => {
      this.selectedSpell = data[0];
    });
  }

  onLevelRequirementChange(target: string): void {
    if (target === "any") {
      this.levelrequirement = -1;
    }
    if (target === "cantrip") {
      this.levelrequirement = 0;
    } else {
      this.levelrequirement = parseInt(target, 10);
    }
    this.setAvalibleSpells();
  }

  setAvalibleSpells(): void {
    this.localSpellList =
      this.levelrequirement === -1
        ? this.spellService.spellsQuickSort.map((s) => s.name)
        : this.spellService.spellsQuickSort
            .filter((s) => {
              return this.levelrequirement === 0
                ? s.level === "cantrip"
                : s.level === this.levelrequirement.toString();
            })
            .map((s) => s.name);
  }

  IsInitialized(): boolean {
    if (!!this.spellService.spellsQuickSort) {
      if (!this.localSpellList.length) {
        this.setAvalibleSpells();
      }
      return true;
    }
    return false;
  }
}
