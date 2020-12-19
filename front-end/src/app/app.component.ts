import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routeChangeAnimation } from "./animations/slide";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [routeChangeAnimation],
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}
  title = "dnd-assistant";

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState
    );
  }

  handleModeToggle(): void {
    this.themeService.toggleMode();
  }
}
