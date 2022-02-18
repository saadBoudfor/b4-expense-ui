import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Observable} from "rxjs";
import {ExpenseBasicStats} from "../../models/expenses/ExpenseBasicStats";

@Injectable({
  providedIn: 'root'
})
export class ExpenseStatsRepository {
  private basicStatsURL = environment.baseUrl + '/expenses/basic-stats';

  constructor(private httpClient: HttpClient,
              private ngxLogger: NGXLogger) {
  }

  getBasicStats(): Observable<ExpenseBasicStats> {
    const headers = {'access-token': '1'};
    return this.httpClient.get<ExpenseBasicStats>(this.basicStatsURL, {headers});
  }

  getBasicRestaurantsStats(): Observable<ExpenseBasicStats> {
    const headers = {'access-token': '1'};
    return this.httpClient.get<ExpenseBasicStats>(this.basicStatsURL + '/restaurants', {headers});
  }

  getBasicStoresStats(): Observable<ExpenseBasicStats> {
    const headers = {'access-token': '1'};
    return this.httpClient.get<ExpenseBasicStats>(this.basicStatsURL + '/stores', {headers});
  }

  getNutrientBasicStats() {
    const headers = {'access-token': '1'};
    return this.httpClient.get<any>(this.basicStatsURL + '/nutrients', {headers});
  }
}
