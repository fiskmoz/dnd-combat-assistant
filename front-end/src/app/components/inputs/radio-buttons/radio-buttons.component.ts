import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IRadioButtonChangeEvent } from "src/app/interfaces/radio-change";

@Component({
  selector: "app-radio-buttons",
  templateUrl: "./radio-buttons.component.html",
  styleUrls: ["./radio-buttons.component.scss"],
})
export class RadioButtonsComponent implements OnInit {
  @Input() name: string[];
  @Input() labels: string[];
  @Input() id: string;
  @Input() firstSelected: boolean;
  @Input() horizontal: boolean;

  @Output() radioChange$ = new EventEmitter<IRadioButtonChangeEvent>();

  constructor() {}

  ngOnInit(): void {}

  onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }
    this.radioChange$.emit({
      id: target.value,
      checked: target.checked,
    } as IRadioButtonChangeEvent);
  }
}
