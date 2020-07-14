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

  onIncrease(event: Event) {
    this.increased$.emit();
  }

  onDecrease(event: Event) {
    this.decreased$.emit();
  }
}
