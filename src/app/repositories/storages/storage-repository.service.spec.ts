import {StorageRepository} from './storage-repository.service';
import {fakeAsync} from "@angular/core/testing";
import {of} from "rxjs";

fdescribe('StorageRepository', () => {
  let service: StorageRepository;
  const httpClientMock: any = jasmine.createSpyObj(['post']);

  it('should save storage success', fakeAsync(() => {
    // given
    httpClientMock.post.and.returnValue(of({
      id: 7,
      name: 'frj_123',
      user: {
        name: 'wiliam',
        lastname: 'smith',
        id: 6
      }
    }))

    // when
    service = new StorageRepository(httpClientMock);
    service.save({
      name: 's_name'
    }).subscribe(saved => {
      // Then
      expect(saved.name).toEqual('frj_123');
      expect(saved.id).toEqual(7);
    })

  }))
});
