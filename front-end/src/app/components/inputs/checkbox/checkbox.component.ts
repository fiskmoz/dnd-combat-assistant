import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ICheckboxChangeEvent } from "src/app/interfaces/checkbox-change";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit {
  @Input() id: string;
  @Input() text: string;
  @Input() checked: boolean;
  @Input() name: string;
  @Input() inline: boolean;
  @Input() disabled: boolean;

  @Output() changed$ = new EventEmitter<ICheckboxChangeEvent>();

  constructor() {}

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      return;
    }

    this.changed$.emit({
      name: target.name,
      checked: target.checked,
    } as ICheckboxChangeEvent);
  }

  ngOnInit(): void {}
}
