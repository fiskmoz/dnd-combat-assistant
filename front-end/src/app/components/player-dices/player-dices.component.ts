import { Component, OnInit } from "@angular/core";
import { RandomService } from "src/app/services/random.service";

@Component({
  selector: "app-player-dices",
  templateUrl: "./player-dices.component.html",
  styleUrls: ["./player-dices.component.scss"],
})
export class PlayerDicesComponent implements OnInit {
  constructor(private randomService: RandomService) {}
  public d20list: number[] = [];
  public d12list: number[] = [];
  public d10list: number[] = [];
  public d8list: number[] = [];
  public d6list: number[] = [];
  public d4list: number[] = [];

  ngOnInit(): void {}

  handleCleard(dice: string) {
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

  handleRoll(dice: string) {
    switch (dice) {
      case "D4":
        this.d4list.push(this.randomService.GetRandomNumber(1, 5));
        break;
      case "D6":
        this.d6list.push(this.randomService.GetRandomNumber(1, 7));
        break;
      case "D8":
        this.d8list.push(this.randomService.GetRandomNumber(1, 9));
        break;
      case "D10":
        this.d10list.push(this.randomService.GetRandomNumber(1, 11));
        break;
      case "D12":
        this.d12list.push(this.randomService.GetRandomNumber(1, 13));
        break;
      case "D20":
        this.d20list.push(this.randomService.GetRandomNumber(1, 21));
        break;
    }
  }
}
