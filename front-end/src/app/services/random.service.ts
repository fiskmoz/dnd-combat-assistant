import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RandomService {
  constructor() {}

  public GetRandomNumber(min: number, max: number) {
    return (
      (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (max - min + 1)) +
      min
    );
  }
}
