import {StorageService} from './storage.service';
import {fakeAsync, tick} from "@angular/core/testing";
import {of} from "rxjs";

fdescribe('StorageService', () => {
  let service: StorageService;
  let repository: any = jasmine.createSpyObj(['existsByName']);

  beforeEach(() => {
    service = new StorageService(repository);
    localStorage.removeItem('ls_storage_id');
  })

  it('should update selected storage success', () => {
    // Given
    const storageID = 6;

    // When
    service.updateSelectedStorageId(storageID);

    // Then
    const saved = localStorage.getItem('ls_storage_id');
    expect(saved).toEqual('6');
  })

  it('should return null if no storage is was found', () => {
    const storedId = service.getSavedStorageId();
    expect(storedId).toBeNull();
  })

  it('should return stored Id success', () => {
    localStorage.setItem('ls_storage_id', '9');
    const storedId = service.getSavedStorageId();
    expect(storedId).toEqual(9);
  })

  it('should not perform search request if storage name empty', fakeAsync(() => {
    repository.existsByName.and.returnValue(of({existByName: true}));
    service = new StorageService(repository);
    tick();
    service.check({}).subscribe(response => {
      expect(response).toEqual({usedName: false, valid: false});
    })
  }))

  it('should check storage validity success', fakeAsync(() => {
    repository.existsByName.and.returnValue(of({existByName: true}));
    const storage: any = {
      buckets: [],
      name: 'new_storage',
    }
    service = new StorageService(repository);
    tick();
    service.check(storage).subscribe(response => {
      expect(response).toEqual({usedName: true, valid: false});
    })
  }))

});
