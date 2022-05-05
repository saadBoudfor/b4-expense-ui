import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientsStatsComponent } from './nutrients-stats.component';

describe('NutrientsStatsComponent', () => {
  let component: NutrientsStatsComponent;
  let fixture: ComponentFixture<NutrientsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrientsStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
