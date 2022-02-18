import {Injectable} from '@angular/core';
import {Storage} from "../data-models/Storage";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageRepository {

  constructor(private httpClient: HttpClient) {
  }

  save(storage: Storage): Observable<Storage> {
    storage.owner = {id: 1};
    return this.httpClient.post<Storage>(environment.baseUrl + '/storages', storage);
  }

  existsByName(name: String | undefined): Observable<{ existByName: boolean }> {
    return this.httpClient.get<{ existByName: boolean }>(environment.baseUrl + '/storages/by-name/' + name);
  }

  getAll(): Observable<Storage[]> {
    return this.httpClient.get<Storage[]>(environment.baseUrl + '/storages/all/' + 1);
  }

  get(storageId: number): Observable<Storage> {
    return this.httpClient.get<Storage>(environment.baseUrl + '/storages/' + storageId);
  }
}
