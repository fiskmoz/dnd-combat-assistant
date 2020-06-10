import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() large: boolean;
  @Input() small: boolean;
  @Input() type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light";
  @Input() disabled: boolean;
  @Input() loading: boolean;

  @Output() clicked$ = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onClick = () => this.clicked$.emit();
}
