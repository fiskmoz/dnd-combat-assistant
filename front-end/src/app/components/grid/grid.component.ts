import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { GridService } from "src/app/services/grid.service";
import {
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
} from "@angular/cdk/drag-drop";
import { IGridEntity } from "src/app/interfaces/grid-entity";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) toolboxElem: CdkDropList;
  @ViewChild(CdkDropList) battlefieldElem: CdkDropList;

  public battlefieldSquares: Array<IGridEntity> = [];

  public selectedColor: string;
  public previousText: string;
  public previousColor: string;

  public toolboxIds: Array<string> = ["", "P", "M", "X"];

  public battlefield: CdkDropList;
  public battlefieldIndex: number;
  public toolbox: CdkDropList;
  public toolboxIndex: number;

  constructor(private gridService: GridService) {
    this.battlefield = null;
    this.toolbox = null;
    for (let i = 0; i < 90; i++) {
      this.battlefieldSquares.push({
        text: "",
        color: "bg-white",
      } as IGridEntity);
    }
    console.log(this.battlefieldSquares);
  }

  ngOnInit(): void {
    this.gridService.GetGridChanges().subscribe(
      (res) => {
        const data = JSON.parse(res.payload.data()["grid"]);
        for (let i = 0; i < 90; i++) {
          this.battlefieldSquares[i] = data[i];
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
    const previousIndex = event.previousIndex;
    if (event.previousContainer !== event.container) {
      if (
        this.battlefieldSquares[currentIndex].text ===
          this.toolboxIds[previousIndex] &&
        this.battlefieldSquares[currentIndex].color === this.selectedColor
      ) {
        return;
      }
      this.battlefieldSquares[currentIndex].text = this.toolboxIds[
        previousIndex
      ];
      this.battlefieldSquares[currentIndex].color = this.selectedColor;
      this.previousText = this.toolboxIds[previousIndex];
      this.previousColor = this.selectedColor;
      this.gridService.UpdateGrid(
        JSON.stringify(Object.assign({}, this.battlefieldSquares))
      );
    }
  }

  onColorSwitch(color: string): void {
    this.selectedColor = color;
  }

  onReset(): void {
    // MODAL HERE WOULD BE COOL.
    for (let i = 0; i < 90; i++) {
      this.battlefieldSquares[i] = {
        text: "",
        color: "bg-white",
      } as IGridEntity;
    }
    this.gridService.UpdateGrid(
      JSON.stringify(Object.assign({}, this.battlefieldSquares))
    );
  }

  handleClick(id: number): void {
    this.battlefieldSquares[id].text = this.previousText;
    this.battlefieldSquares[id].color = this.previousColor;
    this.gridService.UpdateGrid(
      JSON.stringify(Object.assign({}, this.battlefieldSquares))
    );
  }
}
