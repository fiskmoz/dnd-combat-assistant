import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor(private playerService: PlayersService) {}

  navigation = "search";

  ngOnInit(): void {}

  onPageChange($event) {
    switch ($event.target.id) {
      case "nav_search":
        this.navigation = "search";
        break;
      case "nav_player-tools":
        this.navigation = "player-tools";
        break;
      case "nav_generate":
        this.navigation = "generate";
        break;
      case "nav_initiative":
        this.navigation = "initiative";
        break;
      case "nav_grid":
        this.navigation = "grid";
    }
  }
}
