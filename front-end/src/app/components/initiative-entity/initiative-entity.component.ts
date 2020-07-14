import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { IInitiativeEntity } from "src/app/interfaces/initiative-entity";

@Component({
  selector: "app-initiative-entity",
  templateUrl: "./initiative-entity.component.html",
  styleUrls: ["./initiative-entity.component.scss"],
})
export class InitiativeEntityComponent implements OnInit {
  @Input() entity: IInitiativeEntity;

  constructor() {}

  ngOnInit(): void {}
}
