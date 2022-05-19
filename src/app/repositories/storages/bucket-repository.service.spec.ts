import {BucketRepository} from './bucket-repository.service';
import {fakeAsync} from "@angular/core/testing";
import {of} from "rxjs";

fdescribe('BucketRepository', () => {
  let service: BucketRepository;
  let httpClientMock = jasmine.createSpyObj(['get', 'post']);
  beforeEach(() => {
    service = new BucketRepository(httpClientMock);
  })
  describe('Get buckets', () => {
    it('should get buckets success', fakeAsync(() => {
      // Given
      httpClientMock.get.and.returnValue(of(FAKE_BUCKETS))

      // When
      service.get(5).subscribe(results => {
        // Then
        expect(results).toEqual(FAKE_BUCKETS);
      })
    }))

    it('should throw exception if storage id is invalid', () => {
      expect(function () {
        service.get(-5);
      }).toThrow(new Error('cannot perform get request with invalid storage id'));
    })
  })

  describe('Check if name is used', () => {
    it('should check if name is used success', fakeAsync(() => {
      // Given
      httpClientMock.get.and.returnValue(of({existByName: true}));

      // When
      service.checkIfUsed(5, 'bucket_56').subscribe(results => {
        // Then
        expect(results).toEqual({existByName: true});
      })
    }))

    it('should throw error if storage id is invalid', () => {
      expect(function () {
        service.checkIfUsed(-5, 'bucket_2556');
      }).toThrow(new Error('cannot perform get request with invalid storage id'));
    })

    it('should throw error if perform search for invalid bucket name', () => {
      expect(function () {
        service.checkIfUsed(5, 'b');
      }).toThrow(new Error('searched term has to have at least 3 letters'));
    })
  })

  describe('save buckets', () => {
    it('Should save bucket success', fakeAsync(() => {
      // Given
      httpClientMock.post.and.returnValue(of({name: 'bucket_1', owner: {id: 1}, storage: {id: 2}, id: 5}))

      // When
      service.save({name: 'bucket_1', owner: {id: 1}, storage: {id: 2}}).subscribe(saved => {
        // Then
        expect(saved.id).toEqual(5);
      })
    }))

    it('should throw error if try to save invalid bucket', fakeAsync(() => {
      expect(function () {
        service.save({name: 'bucket_1', storage: {id: 2}});
      }).toThrow(new Error('cannot perform save request required bucket\'s fields missing'));
      expect(function () {
        service.save({name: 'bucket_1', owner: {id: 1}});
      }).toThrow(new Error('cannot perform save request required bucket\'s fields missing'));
      expect(function () {
        service.save({name: 'bucket_1', owner: {}, storage: {id: 2}});
      }).toThrow(new Error('cannot perform save request required bucket\'s fields missing'));
      expect(function () {
        service.save({name: 'bucket_1', owner: {id: 1}, storage: {}});
      }).toThrow(new Error('cannot perform save request required bucket\'s fields missing'));
      expect(function () {
        service.save({});
      }).toThrow(new Error('cannot perform save request required bucket\'s fields missing'));
    }))
  })
});

const FAKE_BUCKETS = [{
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
  "remaining": 7.52,
  "quantity": 8.92,
  "expirationDate": "2022-10-03",
  "expirationAfter": {
    "days": 1,
    "hours": 3
  },
  "state": "open"
}]
