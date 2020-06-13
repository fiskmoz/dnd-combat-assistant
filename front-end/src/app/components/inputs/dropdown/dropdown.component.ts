import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
  @Input() list: string[];
  @Input() id: string;

  @Output() change$ = new EventEmitter<string>();

  defaultSelection = "0";

  constructor() {}

  ngOnInit(): void {
    this.defaultSelection = this.list[0];
  }

  onChange(target: string) {
    if (!target) {
      return;
    }

    this.change$.emit(target);
  }
}
