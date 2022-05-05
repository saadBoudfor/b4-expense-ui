import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Budget} from "../models/Budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetRepositoryService {

  constructor(private httpClient: HttpClient,
              private logger: NGXLogger) {
  }

  updateBudget(target: number): Observable<Budget> {
    const headers = {'access-token': '1'};
    const body = {target};
    this.logger.info('Request update budget to ' + target);
    return this.httpClient.put<Budget>(budgetURL + '/define', body, {headers})
  }

}

const budgetURL = environment.baseUrl + '/budget'
