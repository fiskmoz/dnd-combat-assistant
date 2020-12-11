import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { WeaponCardComponent } from "./weapon-card.component";

describe("WeponCardComponent", () => {
  let component: WeaponCardComponent;
  let fixture: ComponentFixture<WeaponCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeaponCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
