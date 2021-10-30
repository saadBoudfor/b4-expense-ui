import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../models/Expense";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ExpenseInfo} from "../models/ExpenseInfo";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseSubject = new BehaviorSubject<{ expense: Expense, bill: any }>({expense: new Expense(), bill: ''});

  constructor(private httpClient: HttpClient) {
  }

  setExpense(expense: Expense, bill: any): void {
    console.log('[expense state]: ', {expense});
    this.expenseSubject.next({expense: expense, bill: bill});
  }

  getExpense(): Observable<{ expense: Expense, bill: any }> {
    return this.expenseSubject.asObservable();
  }

  save(expense: Expense, bill: any): Observable<Expense> {
    const formData = new FormData();
    formData.append('file', bill);
    formData.append('expense', JSON.stringify(expense));

    return this.httpClient.post<Expense>(environment.baseUrl + '/expenses', formData);
  }

  getInfo(): Observable<ExpenseInfo> {
    return this.httpClient.get<ExpenseInfo>(environment.baseUrl + '/expenses/info', {headers: {'access-token': '1'}});
  }

  fetchExpenses(page: number, size: number): Observable<Expense[]> {
    let url = environment.baseUrl + '/expenses';
    if (size !== 0) {
      url += '?size=' + size + '&page=' + page;
    }

    return this.httpClient.get<Expense[]>(url, {headers: {'access-token': '1'}});
  }

  getExpenseByID(id: number): Observable<Expense>  {
    return this.httpClient.get<Expense>(environment.baseUrl + '/expenses/' + id);
  }

  getByPlace(placeID: number): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(environment.baseUrl + '/expenses/place/' + placeID, {headers: {'access-token': '1'}})
  }
}
