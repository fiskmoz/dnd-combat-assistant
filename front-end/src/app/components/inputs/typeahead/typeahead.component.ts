import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from "rxjs/operators";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-typeahead",
  templateUrl: "./typeahead.component.html",
  styleUrls: ["./typeahead.component.scss"],
})
export class TypeaheadComponent implements OnInit {
  constructor() {}

  public model: any[];

  @Input() id: string;
  @Input() list: string[];
  @Input() label: string;
  @Output() selected = new EventEmitter<string>();

  @ViewChild("instance", { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) =>
        term === ""
          ? this.list
          : this.list.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
      )
    );
  };

  selectedItem($event: any) {
    this.selected.emit($event["item"]);
  }

  ngOnInit(): void {}
}
