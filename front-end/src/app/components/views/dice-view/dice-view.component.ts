import { Component, OnInit } from "@angular/core";
import { RandomService } from "src/app/services/random.service";

@Component({
  selector: "app-dice-view",
  templateUrl: "./dice-view.component.html",
  styleUrls: ["./dice-view.component.scss"],
})
export class DiceViewComponent implements OnInit {
  constructor(private randomService: RandomService) {}
  public d20list: number[] = [];
  public d12list: number[] = [];
  public d10list: number[] = [];
  public d8list: number[] = [];
  public d6list: number[] = [];
  public d4list: number[] = [];

  ngOnInit(): void {}

  handleCleard(dice: string): void {
    switch (dice) {
      case "D4":
        this.d4list = [];
        break;
      case "D6":
        this.d6list = [];
        break;
      case "D8":
        this.d8list = [];
        break;
      case "D10":
        this.d10list = [];
        break;
      case "D12":
        this.d12list = [];
        break;
      case "D20":
        this.d20list = [];
        break;
    }
  }

  handleRoll(dice: string): void {
    switch (dice) {
      case "D4":
        this.d4list.push(this.randomService.GetRandomNumber(1, 4));
        break;
      case "D6":
        this.d6list.push(this.randomService.GetRandomNumber(1, 6));
        break;
      case "D8":
        this.d8list.push(this.randomService.GetRandomNumber(1, 8));
        break;
      case "D10":
        this.d10list.push(this.randomService.GetRandomNumber(1, 10));
        break;
      case "D12":
        this.d12list.push(this.randomService.GetRandomNumber(1, 12));
        break;
      case "D20":
        this.d20list.push(this.randomService.GetRandomNumber(1, 20));
        break;
    }
  }
}
