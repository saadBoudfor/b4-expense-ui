import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../../models/expenses/Expense";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class ExpenseRepository {

  private expenseURL = environment.baseUrl + '/expenses';

  constructor(private httpClient: HttpClient,
              private ngxLogger: NGXLogger) {
  }

  save(expense: Expense, bill: any): Observable<Expense> {
    const formData = new FormData();
    formData.append('file', bill);
    formData.append('expense', JSON.stringify(expense));
    return this.httpClient.post<Expense>(this.expenseURL, formData);
  }

  addBill(expenseID: number, bill: any): Observable<Expense> {
    const formData = new FormData();
    formData.append('file', bill);
    return this.httpClient.put<Expense>(this.expenseURL + expenseID, formData);
  }


  fetchExpenses(page?: number, size?: number): Observable<Expense[]> {
    let url = this.expenseURL;
    if (!!size && !!page) {
      url += '?size=' + size + '&page=' + page;
    }
    return this.httpClient.get<Expense[]>(url, {headers: {'access-token': '1'}});
  }

  fetchLastExpenses() {
    return this.httpClient.get<Expense[]>(this.expenseURL + '/last', {headers: {'access-token': '1'}});
  }

  getExpenseByID(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(this.expenseURL + '/' + id);
  }

  getByPlace(placeID: number): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.expenseURL + '/place/' + placeID, {headers: {'access-token': '1'}})
  }

  delete(id: number | undefined) {
    return this.httpClient.delete(this.expenseURL + '/' + id);
  }

}
