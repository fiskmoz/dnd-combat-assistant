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
  public selectedColor = "bg-white";
  public selectedText = "";

  public toolboxIds: Array<string> = ["", "P", "M", "X"];

  public battlefield: CdkDropList;
  public battlefieldIndex: number;
  public toolbox: CdkDropList;
  public toolboxIndex: number;
  public boxes = 144;

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
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const data = JSON.parse(res.payload.data()["grid"]);
        for (let i = 0; i < this.boxes; i++) {
          if (!!data[i]) {
            this.battlefieldSquares[i] = data[i];
          }
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

  ngAfterViewInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    const currentIndex = parseInt(event.container.id, 10);
    const previousIndex = parseInt(event.previousContainer.id, 10);
    const toolboxIndex = event.previousIndex;
    if (event.previousContainer !== event.container) {
      // HANDLE GRID TO GRID
      if (!isNaN(previousIndex)) {
        const tmp = this.battlefieldSquares[currentIndex];
        this.battlefieldSquares[currentIndex] =
          this.battlefieldSquares[previousIndex];
        this.battlefieldSquares[previousIndex] = tmp;
      }
      // HANDLE TOOLBOX TO GRID
      if (!!isNaN(previousIndex)) {
        if (
          this.battlefieldSquares[currentIndex].text !==
            this.toolboxIds[toolboxIndex] ||
          this.battlefieldSquares[currentIndex].color !== this.selectedColor
        ) {
          this.battlefieldSquares[currentIndex].text =
            this.toolboxIds[toolboxIndex];
          this.battlefieldSquares[currentIndex].color = this.selectedColor;
          this.selectedText = this.toolboxIds[toolboxIndex];
        }
      }

      // ALWAYS UPDATE
      this.gridService.UpdateGrid(
        JSON.stringify(Object.assign({}, this.battlefieldSquares))
      );
    }
  }

  onColorSwitch(color: string): void {
    this.selectedColor = color;
  }

  onReset(): void {
    for (let i = 0; i < this.boxes; i++) {
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
