import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {NewItemComponent} from './new-item.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ItemRepository} from "../../../repositories/item-repository.service";
import {NavigationService} from "../../../services/navigation.service";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {Product} from "../../../../b4-expenses/models/expenses/Product";

fdescribe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;
  let itemRepositoryMock: any = jasmine.createSpyObj(['save']);
  let loggerMock: any = jasmine.createSpyObj(['info', 'error', 'warn', 'debug']);
  let routerMock = jasmine.createSpyObj(['navigate']);
  let navigationServiceMock = jasmine.createSpyObj(['getQueryParam']);
  let matDialogMock = jasmine.createSpyObj(['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemComponent],
      imports: [FormsModule],
      providers: [
        {provide: ItemRepository, useValue: itemRepositoryMock},
        {provide: Router, useValue: routerMock},
        {provide: NavigationService, useValue: navigationServiceMock},
        {provide: NGXLogger, useValue: loggerMock},
        {provide: MatDialog, useValue: matDialogMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    navigationServiceMock.getQueryParam.and.returnValue(5);

    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get bucket id from url success', () => {
    expect(component.item.location).toEqual({id: 5});
  })

  it('should update expiration date success on click', fakeAsync(() => {
    // Given
    matDialogMock.open.and.returnValue({
      afterClosed: () => of({days: 5, hours: 8, minutes: 3})
    })
    fixture.detectChanges();
    // When
    component.updateExpiration();
    // Then
    expect(component.item.expirationAfter).toEqual({days: 5, hours: 8, minutes: 3})
    expect(component.expirationDuration).toEqual('5 jours 8 heures 3 minutes')
  }))

  it('should compute available quantity success', () => {
    component.item.product = fakeProduct;
    component.item.product.productQuantity = 20;
    component.item.quantity = 5;

    component.updateAvailableQuantity();

    expect(component.availableQuantity).toEqual(100);
  })

  it('should update item when user choose product and disable product filtering', () => {
    component.item.quantity = 5;
    component.onSelectProduct(fakeProduct);

    expect(component.productName).toEqual(fakeProduct.name);
    expect(component.item.product).toEqual(fakeProduct);
    expect(component.isFilteringProduct).toEqual(false);
    expect(component.availableQuantity).toEqual(100);

  })

  it('should update item when user scan product code bar and disable product scanning', () => {
    component.item.quantity = 5;
    component.onScanProduct(fakeProduct);

    expect(component.productName).toEqual(fakeProduct.name);
    expect(component.item.product).toEqual(fakeProduct);
    expect(component.isFilteringProduct).toEqual(false);
    expect(component.availableQuantity).toEqual(100);
  })

  it('should save new item success', fakeAsync(() => {
    // Given
    component.expirationDate = new Date('2022-03-03');
    component.openDate = new Date('2022-01-03');
    component.availableQuantity = 600;

    itemRepositoryMock.save.and.returnValue(of(component.item))
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}))
    // When
    component.add();

    // Then
    expect(itemRepositoryMock.save).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalled();
    expect(component.item.openDate).toEqual('2022-01-03');
    expect(component.item.expirationDate).toEqual('2022-03-03');

  }))
});

const fakeProduct: Product =  {
  id: 8,
  unit: 'g',
  name: 'poires',
  quantity: 1000,
  productQuantity: 20,
  photo: 'photo_location_url',
  displayQuantity: '5 x 200g',
  score: 'A',
  qrCode: '123456879',
  brand: 'Carrfour',
  calories: 150,
  nutrientLevels: {
    salt: 'low',
    sugars: 'low',
    saturatedFat: 'low',
    fat: 'low'
  },
  comment: '',
  category: 'vegetable'
};
