import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByScoreChartComponent } from './expenses-by-score-chart.component';

describe('ExpensesByScoreChartComponent', () => {
  let component: ExpensesByScoreChartComponent;
  let fixture: ComponentFixture<ExpensesByScoreChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByScoreChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByScoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
