import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
})
export class TextboxComponent implements OnInit {
  @Input() type: "text" | "email";
  @Input() placeholder: string;
  @Input() invalid: boolean;
  @Input() id: string;
  @Input() parentForm: FormGroup;
  @Input() formControlKey: string;

  @Output() textChanged$ = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onTextChange(event: Event) {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    this.textChanged$.emit(target.textContent);
  }
}
