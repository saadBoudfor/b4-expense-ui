import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Budget} from "../../data-model/expenses/Budget";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class BudgetRepositoryService {


  constructor(private httpClient: HttpClient, private logger: NGXLogger) {
  }

  updateBudget(target: number): Observable<Budget> {
    this.logger.info('Request update budget to ' + target);
    return this.httpClient.put<Budget>(budgetURL + '/define', {target}, {headers});
  }

}

const budgetURL = environment.baseUrl + '/budget'
const headers = {'access-token': '1'};
