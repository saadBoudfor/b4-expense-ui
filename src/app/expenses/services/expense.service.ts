import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../models/Expense";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StringUtils} from "../../b4-common/util/StringUtils";
import {ExpenseBasicStats} from "../models/ExpenseBasicStats";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpClient: HttpClient) {
  }

  updateDraftExpense(expense: Expense, bill: any): void {
    console.log('[expense state]: ', {expense});
    localStorage.setItem('draft_expense', JSON.stringify(expense));
    localStorage.setItem('draft_expense_file', JSON.stringify(bill));
  }

  getDraftExpense(): { expense: Expense, bill: any } {
    const savedExpense = localStorage.getItem('draft_expense');
    const savedBill = localStorage.getItem('draft_expense_file');
    console.log('[expense state]: ', {savedExpense});
    return {
      expense: !!savedExpense ? JSON.parse(savedExpense) : new Expense(),
      bill: !!savedBill ? JSON.parse(savedBill) : null
    };
  }

  save(expense: Expense, bill: any): Observable<Expense> {
    const formData = new FormData();
    formData.append('file', bill);
    formData.append('expense', JSON.stringify(expense));

    return this.httpClient.post<Expense>(environment.baseUrl + '/expenses', formData);
  }

  addBill(expenseID: number, bill: any): Observable<Expense> {
    const formData = new FormData();
    formData.append('file', bill);
    return this.httpClient.put<Expense>(environment.baseUrl + '/expenses/' + expenseID, formData);

  }

  getBasicStats(): Observable<ExpenseBasicStats> {
    return this.httpClient.get<ExpenseBasicStats>(environment.baseUrl + '/expenses/basic-stats', {headers: {'access-token': '1'}});
  }

  getBasicRestaurantsStats(): Observable<ExpenseBasicStats> {
    return this.httpClient.get<ExpenseBasicStats>(environment.baseUrl + '/expenses/basic-stats/restaurants', {headers: {'access-token': '1'}});
  }

  getBasicStoresStats(): Observable<ExpenseBasicStats> {
    return this.httpClient.get<ExpenseBasicStats>(environment.baseUrl + '/expenses/basic-stats/stores', {headers: {'access-token': '1'}});
  }

  getNutrientBasicStats() {
    return this.httpClient.get<any>(environment.baseUrl + '/expenses/basic-stats/nutrients', {headers: {'access-token': '1'}});
  }

  fetchExpenses(page: number, size: number): Observable<Expense[]> {
    let url = environment.baseUrl + '/expenses';
    if (size !== 0) {
      url += '?size=' + size + '&page=' + page;
    }

    return this.httpClient.get<Expense[]>(url, {headers: {'access-token': '1'}});
  }

  fetchLastExpenses() {
    return this.httpClient.get<Expense[]>( environment.baseUrl + '/expenses/last', {headers: {'access-token': '1'}});
  }

  getExpenseByID(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(environment.baseUrl + '/expenses/' + id);
  }

  getByPlace(placeID: number): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(environment.baseUrl + '/expenses/place/' + placeID, {headers: {'access-token': '1'}})
  }

  isExpenseValid(expense: Expense): boolean {
    if (expense && expense.place && expense.place.type === 'RESTAURANT') {
      return this.isRestaurantExpenseValid(expense);
    }
    return this.isRestaurantExpenseValid(expense)
      && !!expense.expenseLines[0].product;
  }

  isRestaurantExpenseValid(expense: Expense): boolean {
    return !!expense
      && StringUtils.isNotEmpty(expense.name)
      && expense.expenseLines.length !== 0
      && !!expense.expenseLines[0].quantity
      && !!expense.place;
  }


  delete(id: number | undefined) {
    return this.httpClient.delete(environment.baseUrl + '/expenses/' + id);
  }


}
