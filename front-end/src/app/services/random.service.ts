import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RandomService {
  constructor() {}

  public GetRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
