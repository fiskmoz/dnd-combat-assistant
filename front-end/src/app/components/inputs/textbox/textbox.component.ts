import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
})
export class TextboxComponent implements OnInit {
  @Input() type: "text" | "email" | "password";
  @Input() placeholder: string;
  @Input() invalid: boolean;
  @Input() id: string;
  @Input() text: string;

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
