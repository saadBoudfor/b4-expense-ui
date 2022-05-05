import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Budget} from "../models/Budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetRepositoryService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  updateBudget(newTarget: string, userId: number): Observable<Budget> {
    const headers = {'access-token': userId + ''};
    const body = {target: newTarget};
    this.logger.info('Update display-budget for user: ' + userId + ' , new target: ' + newTarget);
    return this.httpClient.put<Budget>(budgetURL + '/define', body, {headers})
  }

}

const budgetURL = environment.baseUrl + '/budget'
