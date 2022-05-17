import { Component, OnInit } from "@angular/core";
import { GridService } from "src/app/services/grid.service";

@Component({
  selector: "app-grid-controller",
  templateUrl: "./grid-view.component.html",
  styleUrls: ["./grid-view.component.scss"],
})
export class GridViewComponent implements OnInit {
  constructor(public gridService: GridService) {
    gridService.status = "";
  }

  ngOnInit(): void {}

  handleGridIdChange(gridid: string): void {
    this.gridService.gridid = gridid;
    this.gridService.status = "";
  }

  handlePasswordChange(password: string): void {
    this.gridService.password = password;
  }

  handleLogin(): void {
    this.gridService.Authentivate();
  }
  handleLeave(): void {
    this.gridService.Leave();
  }
}
