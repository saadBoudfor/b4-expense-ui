import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {ItemComponent} from './item.component';
import {NGXLogger} from "ngx-logger";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {DatePipe} from "../../../../b4-common/pipes/date/date.pipe";

fdescribe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let loggerMock: any = jasmine.createSpyObj(['error'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, DatePipe ],
      providers: [
        {provide: NGXLogger, useValue: loggerMock}
      ], schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should detect expired product', () => {
    component.value = {
      quantity: 2,
      expirationDate: new Date('1990-02-02'),
      product: {
        productQuantity: 5
      }
    } as any;

    fixture.detectChanges();

    expect(component.expired).toBeTrue();
  })

  it('should detect expired product if expire after product open', () => {
    component.value = {
      quantity: 2,
      expirationAfter: {days: 3},
      openDate: new Date('2022-01-01'),
      expirationDate: new Date('2022-02-02'),
      product: {
        productQuantity: 5
      }
    } as any;

    fixture.detectChanges();

    expect(component.expired).toBeTrue();
  })

  it('should detect finished product', fakeAsync(() => {
    component.value = {
      quantity: 2,
      remaining: 0,
      expirationDate: new Date('2023-02-02'),
      product: {
        productQuantity: 5
      }
    } as any;

    fixture.detectChanges();

    expect(component.finish).toBeTrue();
  }))

  it('should detect opened product', fakeAsync(() => {
    component.value = {
      quantity: 2,
      remaining: 1,
      openDate: new Date(),
      expirationDate: new Date('2023-02-02'),
      product: {
        productQuantity: 5
      }
    } as any;

    fixture.detectChanges();

    expect(component.open).toBeTrue();
  }))
});
