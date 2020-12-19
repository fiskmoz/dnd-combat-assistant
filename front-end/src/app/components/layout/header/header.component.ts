import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() mode: string;
  @Output() lightdark$ = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onModeToggle() {
    this.lightdark$.emit();
  }

  get invertTheme(): string {
    switch (this.mode) {
      case "light":
        return "Dark";
      case "dark":
        return "Light";
    }
  }
}
