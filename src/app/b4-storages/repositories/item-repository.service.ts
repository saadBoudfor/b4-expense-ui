import {Injectable} from '@angular/core';
import {Item} from "../data-models/Item";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UpdateQuantity} from "../data-models/UpdateQuantity";

@Injectable({
  providedIn: 'root'
})
export class ItemRepository {

  constructor(private httpClient: HttpClient) {
  }

  save(item: Item): Observable<Item> {
    if (!item) {
      throw new Error('cannot save empty item');
    }
    if (!item.quantity || item.quantity < 0) {
      throw new Error('cannot save item. Required item\'s quantity missing or negative value');
    }
    if (!item.remaining || (item.remaining && item.remaining < 0)) {
      throw new Error('cannot save item. Required item\'s remaining missing or negative value');
    }
    if (!item.product || (item.product && !item.product.id)) {
      throw new Error('cannot save item. Required  item\'s product  missing');
    }
    return this.httpClient.post<Item>(baseUrl, item);
  }

  getByLocation(bucketId: number): Observable<Item[]> {
    if (!bucketId || bucketId < 0) {
      throw new Error('invalid id: ' + bucketId);
    }
    return this.httpClient.get<Item[]>(baseUrl + '?bucket=' + bucketId);
  }

  getById(itemId: number): Observable<Item> {
    if (!itemId || itemId < 0) {
      throw new Error('invalid id: ' + itemId);
    }
    return this.httpClient.get<Item>(baseUrl + '/' + itemId);
  }

  updateQuantity(updateQuantity: UpdateQuantity, itemId: number): Observable<UpdateQuantity> {
    return this.httpClient
      .post<UpdateQuantity>(baseUrl + '/' + itemId + '/quantity', updateQuantity);
  }
}


const baseUrl = environment.baseUrl + '/items'
