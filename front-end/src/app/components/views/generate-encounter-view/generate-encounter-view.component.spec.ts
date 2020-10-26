import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GenerateEncounterViewComponent } from "./generate-encounter-view.component";

describe("GenerateEncounterComponent", () => {
  let component: GenerateEncounterViewComponent;
  let fixture: ComponentFixture<GenerateEncounterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateEncounterViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEncounterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
