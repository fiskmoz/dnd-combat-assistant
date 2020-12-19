import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { GridService } from "src/app/services/grid.service";
import {
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
} from "@angular/cdk/drag-drop";
import { GridEntity } from "src/app/interfaces/grid";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) toolboxElem: CdkDropList;
  @ViewChild(CdkDropList) battlefieldElem: CdkDropList;

  public battlefieldSquares: Array<GridEntity> = [];

  public closeResult: any;
  public selectedColor: string;
  public selectedText: string;

  public toolboxIds: Array<string> = ["", "P", "M", "X"];

  public battlefield: CdkDropList;
  public battlefieldIndex: number;
  public toolbox: CdkDropList;
  public toolboxIndex: number;
  public boxes = 120;

  constructor(
    private gridService: GridService,
    private modalService: NgbModal,
    private themeService: ThemeService
  ) {
    this.battlefield = null;
    this.toolbox = null;
    for (let i = 0; i < this.boxes; i++) {
      this.battlefieldSquares.push({
        text: "",
        color: "bg-white",
      } as GridEntity);
    }
  }

  ngOnInit(): void {
    this.gridService.GetGridChanges().subscribe(
      (res) => {
        // tslint:disable-next-line: no-string-literal
        const data = JSON.parse(res.payload.data()["grid"]);
        for (let i = 0; i < this.boxes; i++) {
          this.battlefieldSquares[i] = data[i];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(content: any): void {
    this.modalService.open(content, {
      ariaLabelledBy: "modal",
      windowClass: this.themeService.mode,
    });
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  ngAfterViewInit() {}

  drop(event: CdkDragDrop<string[]>) {
    const currentIndex = parseInt(event.container.id, 10);
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
      this.selectedText = this.toolboxIds[previousIndex];
      this.gridService.UpdateGrid(
        JSON.stringify(Object.assign({}, this.battlefieldSquares))
      );
    }
  }

  onColorSwitch(color: string): void {
    this.selectedColor = color;
  }

  onReset(): void {
    for (let i = 0; i < 90; i++) {
      this.battlefieldSquares[i] = {
        text: "",
        color: "bg-white",
      } as GridEntity;
    }
    this.gridService.UpdateGrid(
      JSON.stringify(Object.assign({}, this.battlefieldSquares))
    );
    this.closeModal();
  }

  handleClick(id: number): void {
    this.battlefieldSquares[id].text = this.selectedText;
    this.battlefieldSquares[id].color = this.selectedColor;
    this.gridService.UpdateGrid(
      JSON.stringify(Object.assign({}, this.battlefieldSquares))
    );
  }

  handleToolbarClick(id: string): void {
    this.selectedText = id;
  }

  resetPrevious(): void {
    this.selectedColor = "bg-white";
    this.selectedText = "";
  }
}
