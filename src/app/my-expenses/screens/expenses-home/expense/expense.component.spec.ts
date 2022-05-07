import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {ExpenseComponent} from './expense.component';
import {ConfigService} from "../../../../b4-common/services/config.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

fdescribe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;
  let configServiceMock = jasmine.createSpyObj(['getSelectedTheme']);
  let routerMock = jasmine.createSpyObj(['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseComponent],
      providers: [
        {provide: ConfigService, useValue: configServiceMock},
        {provide: Router, useValue: routerMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    configServiceMock.getSelectedTheme.and.returnValue(of('light'));
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dark value if light theme selected', fakeAsync(() => {
    expect(component.isDark).toBeFalse();
  }))

  it('should update dark value if dark theme selected', fakeAsync(() => {
    configServiceMock.getSelectedTheme.and.returnValue(of('dark-theme'));
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isDark).toBeTruthy();
  }))
});
