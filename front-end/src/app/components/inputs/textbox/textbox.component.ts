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

  @Output() textChanged$ = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onTextChange(name: string) {
    if (!name) {
      return;
    }

    this.textChanged$.emit(name);
  }
}
