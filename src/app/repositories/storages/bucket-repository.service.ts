import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bucket} from "../../data-model/storages/Bucket";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BucketRepository {

  constructor(private httpClient: HttpClient) {
  }

  get(storageId: number) {
    if (!storageId || storageId < 1) {
      throw new Error('cannot perform get request with invalid storage id');
    }
    const url = baseUrl + '?user=' + this.getAuthenticated().id + '&storage=' + storageId;
    return this.httpClient.get<Bucket[]>(url);
  }

  checkIfUsed(storageId: number, name: string): Observable<{ existByName: boolean }> {
    if (!storageId || storageId < 1) {
      throw new Error('cannot perform get request with invalid storage id');
    }
    if (!name || name.length < 4) {
      throw new Error('searched term has to have at least 3 letters');
    }
    const url = baseUrl + '/is-used?name=' + name + '&storage=' + storageId;
    return this.httpClient.get<{ existByName: boolean }>(url);
  }

  save(bucket: Bucket): Observable<Bucket> {
    if (isBucketInValid(bucket)) {
      throw new Error('cannot perform save request required bucket\'s fields missing');
    }
    return this.httpClient.post<Bucket>(baseUrl, bucket);
  }

  getAuthenticated() {
    return {id: 1}
  }
}

const baseUrl = environment.baseUrl + '/buckets';

const isBucketInValid = (bucket: Bucket) => {
  return !bucket || !bucket.storage || !bucket.storage.id || !bucket.owner || !bucket.owner.id;
}
