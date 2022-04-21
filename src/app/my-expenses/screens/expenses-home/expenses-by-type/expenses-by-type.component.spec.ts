import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByTypeComponent } from './expenses-by-type.component';

describe('ExpensesByTypeComponent', () => {
  let component: ExpensesByTypeComponent;
  let fixture: ComponentFixture<ExpensesByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
