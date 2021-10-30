import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Budget} from "../models/Budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private httpClient: HttpClient) {
  }

  getBudget() {
    return this.httpClient.get<Budget>(environment.baseUrl + '/budget/current', {headers: {'access-token': '1'}});
  }

  save(newTarget: string) {
    return this.httpClient
      .put<Budget>(environment.baseUrl + '/budget/define', {target: newTarget}, {headers: {'access-token': '1'}})
  }
}
