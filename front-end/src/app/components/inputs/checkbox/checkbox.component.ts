import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CheckboxChangeEvent } from "src/app/interfaces/inputs";

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

  @Output() changed$ = new EventEmitter<CheckboxChangeEvent>();

  constructor() {}

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      return;
    }

    this.changed$.emit({
      name: target.name,
      checked: target.checked,
    } as CheckboxChangeEvent);
  }

  ngOnInit(): void {}
}
