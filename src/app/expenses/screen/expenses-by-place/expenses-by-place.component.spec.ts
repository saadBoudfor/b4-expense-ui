import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByPlaceComponent } from './expenses-by-place.component';

describe('ExpensesByPlaceComponent', () => {
  let component: ExpensesByPlaceComponent;
  let fixture: ComponentFixture<ExpensesByPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
