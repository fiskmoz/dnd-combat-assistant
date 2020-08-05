import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { GridService } from "src/app/services/grid.service";
import {
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) toolboxElem: CdkDropList;
  @ViewChild(CdkDropList) battlefieldElem: CdkDropList;

  public battlefieldIds: Array<string> = [];

  public toolboxIds: Array<string> = ["", "P", "M", "X"];

  public battlefield: CdkDropList;
  public battlefieldIndex: number;
  public toolbox: CdkDropList;
  public toolboxIndex: number;

  constructor(private gridService: GridService) {
    this.battlefield = null;
    this.toolbox = null;
    for (let i = 0; i < 90; i++) {
      this.battlefieldIds.push("0");
    }
  }

  ngOnInit(): void {
    this.gridService.GetGridChanges().subscribe(
      (res) => {
        const data = JSON.parse(res.payload.data()["grid"]);
        for (let i = 0; i < 90; i++) {
          this.battlefieldIds[i] = data[i];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit() {}

  drop(event: CdkDragDrop<string[]>) {
    const currentIndex = parseInt(event.container.id);
    let match = false;
    if (event.previousContainer !== event.container) {
      switch (event.previousIndex) {
        case 0:
          match =
            this.battlefieldIds[currentIndex] === "" ||
            this.battlefieldIds[currentIndex] === null;
          this.battlefieldIds[currentIndex] = "";
          break;
        case 1:
          match = this.battlefieldIds[currentIndex] === "P";
          this.battlefieldIds[currentIndex] = "P";
          break;
        case 2:
          match = this.battlefieldIds[currentIndex] === "M";
          this.battlefieldIds[currentIndex] = "M";
          break;
        case 3:
          match = this.battlefieldIds[currentIndex] === "X";
          this.battlefieldIds[currentIndex] = "X";
          break;
      }
      if (match) return;
      this.gridService.UpdateGrid(
        JSON.stringify(Object.assign({}, this.battlefieldIds))
      );
    }
  }
}
