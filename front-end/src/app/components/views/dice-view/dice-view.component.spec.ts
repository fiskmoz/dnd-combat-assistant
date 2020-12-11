import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceViewComponent } from './dice-view.component';

describe('DiceViewComponent', () => {
  let component: DiceViewComponent;
  let fixture: ComponentFixture<DiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
