import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routeChangeAnimation } from "./animations/slide";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [routeChangeAnimation],
})
export class AppComponent {
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
  title = "dnd-assistant";

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState
    );
  }

  handleModeToggle(): void {
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
