import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ExpenseBasicStats} from "../../b4-expenses/models/expenses/ExpenseBasicStats";
import {environment} from "../../../environments/environment";
import {NGXLogger} from "ngx-logger";
import {catchError} from "rxjs/operators";
import {Expense} from "../../b4-expenses/models/expenses/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseRepository {


  constructor(private httpClient: HttpClient,
              private logger: NGXLogger) {
  }

  public getStats(): Observable<ExpenseBasicStats> {
    this.logger.debug(logId + 'Request expenses basic stats for user: ' + authenticatedUserId)

    // Build request and log messages (success and error case)
    const successMsq = 'Get expenses basic stats success for user: ' + authenticatedUserId;
    const errorMsq = 'Get expenses basic stats failed for user: ' + authenticatedUserId;
    const rq = this.httpClient.get<ExpenseBasicStats>(expenseUrl + '/basic-stats', {headers});

    // run request
    return this.handleRequest<ExpenseBasicStats>(rq, successMsq, errorMsq);
  }

  get(page?: number, size?: number): Observable<Expense[]> {
    let url = expenseUrl;
    if (!!size && !!page) {
      url += '?size=' + size + '&page=' + page;
    }
    const $successMgs = 'get all expenses success for user: ' + authenticatedUserId;
    const $errorMsg = 'get all expenses failed for user: ' + authenticatedUserId;
    const $rq = this.httpClient.get<Expense[]>(url, {headers});
    return this.handleRequest<Expense[]>($rq, $successMgs, $errorMsg);
  }

  getLast(): Observable<Expense[]> {
    const $successMgs = 'get last 5 expenses success for user: ' + authenticatedUserId;
    const $errorMsg = 'get last 5 expenses failed for user: ' + authenticatedUserId;
    const $rq = this.httpClient.get<Expense[]>(expenseUrl + '/last', {headers});
    return this.handleRequest<Expense[]>($rq, $successMgs, $errorMsg);
  }

  private handleRequest<Type>(rq: Observable<Type>, logSuccess: string, logFailed: string): Observable<Type> {
    return rq.pipe(response => {
      this.logger.debug(logId + logSuccess, {response});
      return response;
    }, catchError(err => {
      this.logger.error(logId + logFailed, {err});
      return throwError(err);
    }));
  }

}

const authenticatedUserId = '1';
const expenseUrl = environment.baseUrl + '/expenses';
const logId = '[ExpenseRepository] ';
const headers = {'access-token': authenticatedUserId};
