import {fakeAsync} from '@angular/core/testing';

import {ItemRepository} from './item-repository.service';
import {Item} from "../data-models/Item";
import {of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Product} from "../../my-products/models/Product";

fdescribe('ItemRepositoryService', () => {
  let service: ItemRepository;
  let httpClientMock = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);

  let fakeItems: Item[];

  beforeEach(() => {
    fakeItems = items;
  })

  describe('Save item', () => {
    it('Should save item success', fakeAsync(() => {

      // Given
      httpClientMock.post.and.returnValue(of(fakeItems[0]));

      // When
      service = new ItemRepository(httpClientMock);
      service.save(fakeItems[0]).subscribe(data => {

        // Then
        expect(data).toEqual(fakeItems[0]);
        expect(httpClientMock.post).toHaveBeenCalled();
      })

    }))

    it('Should throw error if item is empty ', fakeAsync(() => {
      service = new ItemRepository(httpClientMock);
      let item: any = null;
      expect(() => {
        service.save(item);
      }).toThrowError('cannot save empty item');

      item = JSON.parse(JSON.stringify(fakeItems[0]));
      item.quantity = null;

      expect(() => {
        service.save(item);
      }).toThrowError('cannot save item. Required item\'s quantity missing or negative value');

    }))

    it('Should throw error if item\'s remaining is empty ', fakeAsync(() => {
      service = new ItemRepository(httpClientMock);
      let item: any = null;
      item = JSON.parse(JSON.stringify(fakeItems[0]));

      item.remaining = null;

      expect(() => {
        service.save(item);
      }).toThrowError('cannot save item. Required item\'s remaining missing or negative value');

    }))


    it('Should throw error if item\'s product is empty ', fakeAsync(() => {
      service = new ItemRepository(httpClientMock);
      let item: any = null;
      item = JSON.parse(JSON.stringify(fakeItems[0]));

      item.product = null;

      expect(() => {
        service.save(item);
      }).toThrowError('cannot save item. Required  item\'s product  missing');

    }))
  })

  describe('Get by location', () => {
    it('Should get by location success', fakeAsync(() => {
      // Given
      httpClientMock.get.and.returnValue(of(items));

      // When
      service = new ItemRepository(httpClientMock);
      service.getByLocation(1).subscribe(data => {

        // Then
        expect(data).toEqual(fakeItems);
        expect(httpClientMock.get).toHaveBeenCalled();
      })

    }))

    it('should throw error if id is invalid', fakeAsync(() => {
      // Given
      service = new ItemRepository(httpClientMock);

      // When - then
      expect(() => {
        service.getByLocation(-1);
      }).toThrowError('invalid id: -1');

    }))
  })

  describe('Get by id', () => {
    it('Should get by id success', fakeAsync(() => {
      // Given
      httpClientMock.get.and.returnValue(of(items[0]));
      // When
      service = new ItemRepository(httpClientMock);
      service.getById(1).subscribe(data => {

        // Then
        expect(data).toEqual(items[0]);
        expect(httpClientMock.get).toHaveBeenCalled();
      })
    }))
  })

  it('should throw error if id is invalid', fakeAsync(() => {
    // Given
    service = new ItemRepository(httpClientMock);

    // When - then
    expect(() => {
      service.getById(-1);
    }).toThrowError('invalid id: -1');

  }))


  it('should update quantity success', fakeAsync(() => {
    // Given
    httpClientMock.post.and.returnValue(of({quantity: 300, comment: '', id: '8'}));
    service = new ItemRepository(httpClientMock);
    service.updateQuantity({quantity: 300, comment: ''}, 9)
      .subscribe(saved => {
        expect(saved).toEqual({quantity: 300, comment: '', id: '8'});
        expect(httpClientMock.post).toHaveBeenCalledWith(environment.baseUrl + '/items/9/quantity', {quantity: 300, comment: ''})
      })
  }))
});


const items: Item[] = [
  {
    "id": 0,
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
    "product": new Product(8),
    "remaining": 7.52,
    "quantity": 8.92,
    "expirationDate": "2022-10-03",
    "expirationAfter": {
      "days": 1,
      "hours": 3
    },
    "state": "open"
  },
  {
    "id": 1,
    "expense": {
      "name": "Cognicode",
      "expenseLines": [],
      "place": {
        "id": 45,
        "name": "restau u",
        "type": "STORE",
        "address": {}
      }
    },
    "remaining": 9.29,
    "quantity": 5.2,
    "expirationDate": "2022-08-24",
    "expirationAfter": {
      "days": 5,
      "hours": 3
    },
    "state": "open"
  },
  {
    "id": 2,
    "expense": {
      "name": "Scentric",
      "expenseLines": [],
      "place": {
        "id": 45,
        "name": "restau u",
        "type": "STORE",
        "address": {}
      }
    },
    "remaining": 9.29,
    "quantity": 5.25,
    "expirationDate": "2022-07-06",
    "expirationAfter": {
      "days": 0,
      "hours": 5
    },
    "state": "open"
  }
]
