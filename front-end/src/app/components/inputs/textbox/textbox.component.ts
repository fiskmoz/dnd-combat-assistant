import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
})
export class TextboxComponent {
  @Input() type: "text" | "email" | "password";
  @Input() placeholder: string;
  @Input() invalid: boolean;
  @Input() id: string;
  @Input() text: string;

  @Output() textChanged$ = new EventEmitter<string>();
  @Output() inputSubmitted$ = new EventEmitter<void>();

  onTextChange(name: string): void {
    if (!name) {
      return;
    }
    this.textChanged$.emit(name);
  }
  submit(): void {
    this.inputSubmitted$.emit();
  }
}
