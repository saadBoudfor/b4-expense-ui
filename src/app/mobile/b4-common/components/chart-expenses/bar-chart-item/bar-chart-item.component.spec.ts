import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartItemComponent } from './bar-chart-item.component';

describe('BarChartItemComponent', () => {
  let component: BarChartItemComponent;
  let fixture: ComponentFixture<BarChartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
