import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UpdateQuantityComponent} from './update-quantity.component';
import {FormsModule} from "@angular/forms";
import {NavigationService} from "../../../../../../services/storages/navigation.service";
import {ItemRepository} from "../../../../../../repositories/storages/item-repository.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";

fdescribe('UpdateQuantityComponent', () => {
  let component: UpdateQuantityComponent;
  let fixture: ComponentFixture<UpdateQuantityComponent>;
  // mocks
  let loggerMock: any;
  let itemRepositoryMock: any;
  let navigationServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // init mocks
    loggerMock = jasmine.createSpyObj(['error', 'debug', 'info']);
    itemRepositoryMock = jasmine.createSpyObj(['updateQuantity']);
    navigationServiceMock = jasmine.createSpyObj(['getQueryParam', 'getParamIgnoreChecks']);
    routerMock = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: NavigationService, useValue: navigationServiceMock},
        {provide: ItemRepository, useValue: itemRepositoryMock},
        {provide: NGXLogger, useValue: loggerMock},
        {provide: Router, useValue: routerMock},
      ],
      declarations: [UpdateQuantityComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    // mock default behavior (common)
    navigationServiceMock.getQueryParam.and.returnValue(8);
    itemRepositoryMock.updateQuantity.and.returnValue(of({quantity: 300, comment: '', id: 6}))
    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));

    initComponent();
  });

  it('should create and extract item id', () => {
    navigationServiceMock.getParamIgnoreChecks.and.returnValue(99);

    initComponent();

    expect(component).toBeTruthy();
    expect(component.id).toEqual(8);
    expect(component.quantity).toEqual(99);
  });

  it('should redirect to item details success', () => fakeAsync(() => {

    fixture.detectChanges();

    component.backToItem();

    tick();

    expect(loggerMock.debug).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  }))

  it('should disable submit button if quantity not set', fakeAsync(() => {
    const quantityInput = fixture.debugElement.query(By.css('input.quantity')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('button.submit')).nativeElement;
    quantityInput.value = '';

    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();
  }))

  it('should disable submit button if quantity not valid', fakeAsync(() => {
    const quantityInput = fixture.debugElement.query(By.css('input.quantity')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('button.submit')).nativeElement;
    quantityInput.value = '-9';

    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();
  }))

  it('should enable submit button if quantity not set', fakeAsync(() => {
    const quantityInput = fixture.debugElement.query(By.css('input.quantity')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('button.submit')).nativeElement;

    quantityInput.value = '300';
    quantityInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  }))

  it('should update quantity success', fakeAsync(() => {
    component.quantity = 300;
    component.comment = 'some comment';

    component.updateQuantity();
    tick();

    expect(itemRepositoryMock.updateQuantity).toHaveBeenCalled();
    expect(loggerMock.debug).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  }))

  function initComponent() {
    fixture = TestBed.createComponent(UpdateQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
