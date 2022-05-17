import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-adjust",
  templateUrl: "./adjust.component.html",
  styleUrls: ["./adjust.component.scss"],
})
export class AdjustComponent implements OnInit {
  @Input() increaseButtonText: string;
  @Input() decreaseButtonText: string;

  @Output() increased$ = new EventEmitter<void>();
  @Output() decreased$ = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onIncrease(_event: Event): void {
    this.increased$.emit();
  }

  onDecrease(_event: Event) {
    this.decreased$.emit();
  }
}
