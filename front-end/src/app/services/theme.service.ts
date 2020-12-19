import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public mode = "";

  constructor() {
    try {
      this.mode = localStorage.getItem("mode");
    } catch (e) {
      console.log(e);
    }
    if (!this.mode) {
      this.mode = "light";
    }
  }

  toggleMode(): void {
    switch (this.mode) {
      case "light":
        this.mode = "dark";
        break;
      case "dark":
        this.mode = "light";
        break;
    }
    localStorage.setItem("mode", this.mode);
  }
}
