import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopExpensesComponent } from './top-expenses.component';

describe('TopExpensesComponent', () => {
  let component: TopExpensesComponent;
  let fixture: ComponentFixture<TopExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
