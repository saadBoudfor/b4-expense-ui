import {Injectable} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PlaceExpense} from "../../b4-common/models/PlaceExpense";
import {Expense} from "../models/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private draftExpense!: Expense;
  // file
  private bill: any;

  constructor(private logger: NGXLogger, private httpClient: HttpClient) {
  }

  createNewDraft(expense: Expense) {
    this.logger.info('create new expense', {expense})
    this.draftExpense = expense;
    localStorage.setItem(localStorageId, JSON.stringify(this.draftExpense));
  }

  clear() {
    localStorage.removeItem(localStorageId);
    localStorage.removeItem(billStorageId);
    this.bill = false;
  }

  updateDraft(expense: Expense) {
    this.logger.info('update draft expense', {expense})
    this.draftExpense = expense;
    localStorage.setItem(localStorageId, JSON.stringify(this.draftExpense));
  }

  updateBill(bill: any) {
    this.bill = bill;
    localStorage.setItem(billStorageId, JSON.stringify(bill));
  }

  private getBill() {
    if (this.bill) return this.bill;
    const fileStr = localStorage.getItem(billStorageId);
    if (fileStr) {
      return JSON.parse(fileStr);
    }
  }

  getCurrentDraft() {
    const draftExpense = localStorage.getItem(localStorageId);

    if (!!draftExpense) {
      this.draftExpense = JSON.parse(draftExpense);
      this.logger.info('Load draft expense from browser cache', {draftExpense: this.draftExpense})
    }
    return this.draftExpense;
  }

  save(expense: Expense, bill?: any): Observable<Expense> {
    const formData = new FormData();
    if (bill)
      formData.append('file', bill);
    this.draftExpense.user = {id: 1};
    formData.append('expense', JSON.stringify(expense));
    return this.httpClient.post<Expense>(environment.baseUrl + '/expenses', formData);
  }

  validateExpense(): Observable<Expense> {
    return this.save(this.draftExpense, this.getBill());
  }

  createAndSave(expense: Expense): Observable<Expense> {
    this.createNewDraft(expense);
    this.updateBill(this.bill);
    return this.validateExpense();
  }

  getExpenseById(id: number) {
    return this.httpClient.get<Expense>(environment.baseUrl + '/expenses/' + id);
  }

  getTopFrequentedRestaurants() {
    return this.httpClient.get<PlaceExpense[]>(environment.baseUrl + '/places/restaurants/ranking');
  }

  getTopFrequentedStores() {
    return this.httpClient.get<PlaceExpense[]>(environment.baseUrl + '/places/stores/ranking');
  }

}

const logId = '[ExpenseService] ';
const localStorageId = 'draft_expense';
const billStorageId = 'bill';
