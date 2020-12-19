import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;

  @Output() changed$ = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any): void {
    this.changed$.emit(event);
  }
}
