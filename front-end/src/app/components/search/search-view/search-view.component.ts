import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-view",
  templateUrl: "./search-view.component.html",
  styleUrls: ["./search-view.component.scss"],
})
export class SearchViewComponent implements OnInit {
  public active = "monster";
  constructor() {}

  ngOnInit(): void {}
}
