import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { IInitiativeEntity } from "src/app/interfaces/initiative-entity";

@Component({
  selector: "app-initiative-entity",
  templateUrl: "./initiative-entity.component.html",
  styleUrls: ["./initiative-entity.component.scss"],
})
export class InitiativeEntityComponent implements OnInit {
  @Input() entity: IInitiativeEntity;

  @Output() imageClicked$ = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  onImageClick(): void {
    this.imageClicked$.emit();
  }
}
