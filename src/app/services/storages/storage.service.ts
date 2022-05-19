import {Injectable} from '@angular/core';
import {Storage} from '../../data-model/storages/Storage';
import * as utils from "lodash";
import {Observable, of} from "rxjs";
import {StorageRepository} from "../../repositories/storages/storage-repository.service";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storageRepository: StorageRepository) {
  }

  /**
   * Check storage validity
   * @param storage to save
   */
  check(storage: Storage): Observable<{ usedName: boolean, valid: boolean }> {
    if (utils.isEmpty(storage.name)) {
      return of({usedName: false, valid: false});
    }
    const isStorageValid = !!storage.buckets
      && !utils.isEmpty(storage.buckets)
      && !utils.isEmpty(storage.buckets[0].name)
      && !!storage.name
      && storage.name.length > 3;

    return this.storageRepository.existsByName(storage.name).pipe(map(response => {
      return {usedName: response.existByName, valid: isStorageValid}
    }));
  }

  getSavedStorageId(): number | null {
    const idStr = localStorage.getItem(LS_STORAGE_ID);
    return !!idStr ? parseInt(idStr) : null;
  }

  updateSelectedStorageId(id: number) {
    localStorage.setItem(LS_STORAGE_ID, id + '');
  }

}

const LS_STORAGE_ID: string = 'ls_storage_id';
