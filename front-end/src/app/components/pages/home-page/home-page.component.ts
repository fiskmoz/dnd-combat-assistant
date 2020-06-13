import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor(private playerService: PlayersService) {}

  ngOnInit(): void {}
}
