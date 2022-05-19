import {Injectable} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Expense} from "../../data-model/expenses/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private draftExpense!: Expense;
  // file
  private bill: any;

  constructor(private logger: NGXLogger,
              private httpClient: HttpClient) {
  }

  createNewDraft(expense: Expense) {
    this.logger.debug('create new expense', {expense})
    this.draftExpense = expense;
    localStorage.setItem(localStorageId, JSON.stringify(this.draftExpense));
  }

  clear() {
    this.logger.debug('clear cache');
    localStorage.removeItem(localStorageId);
    localStorage.removeItem(billStorageId);
    this.bill = null;
    this.draftExpense = new Expense();
  }

  updateDraft(expense: Expense) {
    this.logger.debug('update draft expense', {expense})
    this.draftExpense = expense;
    localStorage.setItem(localStorageId, JSON.stringify(this.draftExpense));
  }

  updateBill(bill: any) {
    this.logger.debug('update bill');
    this.bill = bill;
    localStorage.setItem(billStorageId, JSON.stringify(bill));
  }

  private getBill() {
    if (this.bill) return this.bill;
    const fileStr = localStorage.getItem(billStorageId);
    try {
      return JSON.parse(fileStr ? fileStr : '');
    } catch (error) {
      this.logger.error('failed to load bill from cache', {error});
    }
  }

  getCurrentDraft() {
    const draftExpense = localStorage.getItem(localStorageId);

    if (!!draftExpense) {
      this.draftExpense = JSON.parse(draftExpense);
      this.logger.debug('Load draft expense from browser cache', {draftExpense: this.draftExpense})
    }
    return this.draftExpense;
  }

  save(expense: Expense, bill?: any): Observable<Expense> {
    this.logger.debug('save expense in db', {expense, bill})
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

}

const localStorageId = 'draft_expense';
const billStorageId = 'bill';
