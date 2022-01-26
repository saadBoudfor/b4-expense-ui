import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Place} from "../models/Place";
import {environment} from "../../../environments/environment";
import {PlaceExpense} from "../models/PlaceExpense";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private httpClient: HttpClient) {
  }

  findAddresses(searchStr: string): Observable<AddressGov[]> {
    return this.httpClient.get<AddressGovResultSearch>(environment.baseUrl + '/places/addresses/' + searchStr)
      .pipe(map(data => data.features.map(feature => feature.properties)));
  }

  findRestaurant(searchStr: string): Observable<Place[]> {
    return this.httpClient.get<Place[]>(environment.baseUrl + '/places/restaurants/' + searchStr)
  }

  findStores(searchStr: string): Observable<Place[]> {
    return this.httpClient.get<Place[]>(environment.baseUrl + '/places/storage/' + searchStr)
  }

  getStoresRanking(): Observable<PlaceExpense[]> {
    return this.httpClient.get<PlaceExpense[]>(environment.baseUrl + '/places/storage/ranking');
  }

  getRestaurantRanking(): Observable<PlaceExpense[]> {
    return this.httpClient.get<PlaceExpense[]>(environment.baseUrl + '/places/restaurants/ranking');
  }

}

interface AddressGovResultSearch {
  features: { properties: { city: string, street: string, postcode: string, housenumber: string, label: string } }[];
}

export interface AddressGov {
  city: string;
  street: string;
  postcode: string;
  housenumber: string;
  label: string;
}
