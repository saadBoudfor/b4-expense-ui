import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Observable} from "rxjs";
import {ExpenseBasicStats} from "../../b4-expenses/models/expenses/ExpenseBasicStats";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpensesStatsRepository {

  constructor(private httpClient: HttpClient,
              private logger: NGXLogger) {
  }

  getRestaurants(): Observable<ExpenseBasicStats> {
    this.logger.info(logId + ' get restaurants stats');
    return this.httpClient.get<ExpenseBasicStats>(expenseUrl + '/restaurants', {headers});
  }

  getStores() {
    this.logger.info(logId + ' get stores stats');
    return this.httpClient.get<ExpenseBasicStats>(expenseUrl + '/stores', {headers});
  }
}

const authenticatedUserId = '1';
const expenseUrl = environment.baseUrl + '/expenses/basic-stats';
const logId = '[ExpensesStatsRepository] ';
const headers = {'access-token': authenticatedUserId};
