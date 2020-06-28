import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Output() pageChange = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}

  onLinkClick($event: MouseEvent) {
    this.pageChange.emit($event);
  }
}
