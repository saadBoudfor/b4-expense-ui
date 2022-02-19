import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ItemDetailsComponent} from './item-details.component';
import {ActivatedRoute, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {Item} from "../../../data-models/Item";
import {ItemRepository} from "../../../repositories/item-repository.service";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

fdescribe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  let routerMock: any;
  let loggerMock: any;
  let activatedRouteServiceMock: any;
  let itemRepositoryMock: any;

  // define mocks
  const snapshot = {queryParams: {itemId: '6'}};
  activatedRouteServiceMock = jasmine.createSpyObj({}, {snapshot});

  routerMock = jasmine.createSpyObj(['navigate']);
  itemRepositoryMock = jasmine.createSpyObj(['getById']);
  loggerMock = jasmine.createSpyObj(['info', 'error', 'warn']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      imports: [FormsModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ItemRepository, useValue: itemRepositoryMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });


  beforeEach(() => {
    // define mocks default behavior
    loggerMock.error.and.callFake((data: any) => console.error(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));
    itemRepositoryMock.getById.and.returnValue(of(item));
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Item id extraction', () => {
    it('should extract ItemId from url on component load', fakeAsync(() => {
      expect(itemRepositoryMock.getById).toHaveBeenCalledWith(6);
    }))

    it('[Isolated] should redirect to home page if ItemId is null', fakeAsync(() => {
      activatedRouteServiceMock = {snapshot: {queryParams: {itemId: null}}};

      component = new ItemDetailsComponent(itemRepositoryMock,
        loggerMock,
        routerMock,
        activatedRouteServiceMock);

      component.ngOnInit();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/storage']);
      expect(loggerMock.error).toHaveBeenCalled();
    }))

    it('[Isolated] should redirect to home page if extracted itemId id is a negative value', (() => {
      activatedRouteServiceMock = {snapshot: {queryParams: {itemId: -96}}};

      component = new ItemDetailsComponent(itemRepositoryMock,
        loggerMock,
        routerMock,
        activatedRouteServiceMock);

      component.ngOnInit();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/storage']);
      expect(loggerMock.error).toHaveBeenCalled();
    }))
  })

  it('Build item details model success', fakeAsync(() => {
    expect(component.itemInformation).toEqual([
      {key: 'Nom du produit', value: 'poires'},
      {key: 'Quantité', value: '1000 g'},
      {key: 'Quantité restante', value: 400 + ' g', action: 'update_quantity'},
      {key: 'Expire le', value: '2022-10-03'},
      {key: 'Expiration apres ouverture', value: '3j'}
    ])
    expect(component.product_photo).toEqual(item.product?.photo);
    expect(component.nutritionalInformation).toEqual([
      {key: 'Calories', value: item?.product?.calories + ' kcal'},
      {key: 'Matière grasses', value: item?.product?.nutrientLevels?.fat},
      {key: 'Glucides', value: item?.product?.nutrientLevels?.saturatedFat},
      {key: 'Sucres', value: item?.product?.nutrientLevels?.sugars},
      {key: 'Sel', value: item?.product?.nutrientLevels?.salt},
    ])
  }))

  it('should display item details success', fakeAsync(() => {
    const productDetailSection = fixture.debugElement.query(By.css('section.product-details')).nativeElement;
    expect(productDetailSection.innerHTML).toContain('1000 g');
    expect(productDetailSection.innerHTML).toContain(400 + ' g');
    expect(productDetailSection.innerHTML).toContain('2022-10-03');
    expect(productDetailSection.innerHTML).toContain('3j');

    const nutritionalInformationSection = fixture.debugElement
      .query(By.css('section.nutritional-information'))
      .nativeElement;

    expect(nutritionalInformationSection.innerHTML).toContain(item?.product?.calories + ' kcal');
    expect(nutritionalInformationSection.innerHTML).toContain(item?.product?.nutrientLevels?.fat);
    expect(nutritionalInformationSection.innerHTML).toContain(item?.product?.nutrientLevels?.saturatedFat);
    expect(nutritionalInformationSection.innerHTML).toContain(item?.product?.nutrientLevels?.sugars);
    expect(nutritionalInformationSection.innerHTML).toContain(item?.product?.nutrientLevels?.salt);
  }))

  it('should redirect to update quantity page when user click on update button', fakeAsync(() => {
    const updateQuantityButton = fixture.debugElement.query(By.css('button.update-quantity')).nativeElement;
    activatedRouteServiceMock = {snapshot: {queryParams: {itemId: 6}}};
    itemRepositoryMock.getById.and.returnValue(of(item));

    updateQuantityButton.click();
    tick();

    expect(routerMock.navigate).toHaveBeenCalled();
  }))
});

const item: Item = {
  "id": 6,
  "expense": {
    "name": "Glasstep",
    "expenseLines": [],
    "place": {
      "id": 45,
      "name": "restau u",
      "type": "STORE",
      "address": {}
    }
  },
  "product": {
    id: 8,
    unit: 'g',
    name: 'poires',
    quantity: 1000,
    productQuantity: 200,
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
  },
  "remaining": 400,
  "quantity": 5,
  "expirationDate": "2022-10-03",
  "expirationAfter": {
    "days": 1,
    "hours": 3
  },
  "state": "open"
}
