import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
  @Input() list: string[];
  @Input() id: string;
  @Input() default: string;

  @Output() change$ = new EventEmitter<string>();

  defaultSelection = "0";

  constructor() {}

  ngOnInit(): void {
    this.defaultSelection = this.list[parseInt(this.default, 10)];
  }

  onChange(target: string): void {
    if (!target) {
      return;
    }

    this.change$.emit(target);
  }
}
