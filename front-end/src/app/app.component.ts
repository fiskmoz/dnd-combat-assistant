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
  title = "dnd-assistant";

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState
    );
  }
}
