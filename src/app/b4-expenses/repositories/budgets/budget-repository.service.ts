import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Budget} from "../../models/expenses/Budget";
import {Observable} from "rxjs";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class BudgetRepository {

  private static baseURL = environment.baseUrl + '/budget';

  constructor(private httpClient: HttpClient, private logger: NGXLogger) {
  }

  getByUserId(userId: number): Observable<Budget> {
    const headers = {'access-token': userId + ''};
    this.logger.info('Load defined display-budget for user: ' + userId);
    return this.httpClient.get<Budget>(BudgetRepository.baseURL + '/current', {headers});
  }

  save(newTarget: string, userId: number): Observable<Budget> {
    const headers = {'access-token': userId + ''};
    const body = {target: newTarget};
    this.logger.info('Update display-budget for user: ' + userId + ' , new target: ' + newTarget);
    return this.httpClient.put<Budget>(BudgetRepository.baseURL + '/define', body, {headers})
  }
}
