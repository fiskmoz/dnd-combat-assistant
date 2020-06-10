import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
  @Input() list: string[];
  @Input() id: string;
  @Input() parentForm: FormGroup;
  @Input() formControlKey: string;

  constructor() {}

  ngOnInit(): void {}
}
