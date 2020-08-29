import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dice",
  templateUrl: "./dice.component.html",
  styleUrls: ["./dice.component.scss"],
})
export class DiceComponent implements OnInit {
  constructor() {}

  @Input() diceList: number[];
  @Input() dice: string;
  @Output() rolled$ = new EventEmitter<string>();
  @Output() cleared$ = new EventEmitter<string>();

  ngOnInit(): void {}

  getTotal(): number {
    let total = 0;
    if (!this.diceList) return 0;
    this.diceList.forEach((d) => {
      total += d;
    });
    return total;
  }
  onRolledClick() {
    this.rolled$.emit(this.dice);
  }
  onClearedClick() {
    this.cleared$.emit(this.dice);
  }
}
