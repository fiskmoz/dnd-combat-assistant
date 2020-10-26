import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { InitiativeEntity } from "src/app/interfaces/initiative";

@Component({
  selector: "app-initiative-entity",
  templateUrl: "./initiative-entity.component.html",
  styleUrls: ["./initiative-entity.component.scss"],
})
export class InitiativeEntityComponent implements OnInit {
  @Input() entity: InitiativeEntity;

  @Output() imageClicked$ = new EventEmitter<void>();
  @Output() increasePrio$ = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  onImageClick(): void {
    this.imageClicked$.emit();
  }
  onIncreasePrio(): void {
    this.increasePrio$.emit();
  }
}
