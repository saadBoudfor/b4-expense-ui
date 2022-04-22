import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesActionComponent } from './expenses-action.component';

describe('ExpensesActionComponent', () => {
  let component: ExpensesActionComponent;
  let fixture: ComponentFixture<ExpensesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
