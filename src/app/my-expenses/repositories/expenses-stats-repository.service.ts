import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ExpenseBasicStats} from "../models/ExpenseBasicStats";

@Injectable({
  providedIn: 'root'
})
export class ExpensesStatsRepository {

  constructor(private httpClient: HttpClient,
              private logger: NGXLogger) {
  }

  getRestaurants(): Observable<ExpenseBasicStats> {
    this.logger.debug('get restaurants stats for user: '  + authenticatedUserId);
    return this.httpClient.get<ExpenseBasicStats>(expenseUrl + '/restaurants', {headers});
  }

  getStores() {
    this.logger.debug('get stores stats for user: '  + authenticatedUserId);
    return this.httpClient.get<ExpenseBasicStats>(expenseUrl + '/stores', {headers});
  }

  getNutrientBasicStats() {
    this.logger.debug('get nutrients stats for user: '  + authenticatedUserId);
    return this.httpClient.get<{ stats: { count: number, label: string }[] }>(expenseUrl + '/nutrients');
  }
}

const authenticatedUserId = '1';
const expenseUrl = environment.baseUrl + '/expenses/basic-stats';
const headers = {'access-token': authenticatedUserId};
