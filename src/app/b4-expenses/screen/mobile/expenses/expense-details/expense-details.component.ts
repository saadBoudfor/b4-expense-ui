import {Component, OnInit} from '@angular/core';
import {ExpenseRepository} from "../../../../repositories/expenses/expense-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Expense} from "../../../../models/Expense";
import {environment} from "../../../../../../environments/environment";
import {Location} from "@angular/common";
import {ExpenseUtils} from "../../../../../b4-common/util/ExpenseUtils";
import {ExpenseLine} from "../../../../models/ExpenseLine";
import {DownloadUtils} from "../../../../../lib/utils/DownloadUtils";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
  expense!: Expense;
  photoBaseURl: string = environment.fileServerURL + '/expenses/';
  price: string = '0';
  selectedExpenseLine!: ExpenseLine | null;
  private logPrefix = '[ExpenseDetailsComponent] ';

  constructor(private expenseRepository: ExpenseRepository,
              public location: Location,
              private router: Router,
              private logger: NGXLogger,
              private activatedRouteService: ActivatedRoute) {
  }

  ngOnInit(): void {
    const queryParams = this.activatedRouteService.snapshot.queryParams;
    if (!!queryParams.id || queryParams.id.length !== 0) {
      this.expenseRepository.getExpenseByID(queryParams.id).subscribe(expense => {
        this.logger.info(this.logPrefix + 'display expense ' + queryParams.id + ' details', {expense})
        this.expense = expense;
        this.price = ExpenseUtils.getPrice(this.expense);
      }, error => {
        this.logger.error(this.logPrefix + 'Failed to load expense details (expense\'s id: ' + queryParams.id + ')', {error});
      })
    } else {
      this.logger.error(this.logPrefix + 'Expenses details was loaded with missing or invalid expense id');
      this.router.navigate(['/expenses']).catch(reason => {
        this.logger.error(this.logPrefix + 'failed to redirect to expenses home page', {reason});
      })
    }

  }

  delete() {
    this.expenseRepository.delete(this.expense.id).subscribe(() => {
      this.logger.warn(this.logPrefix + 'expense deleted', {expense: this.expense})
      this.router.navigate(['/expenses']).catch(reason => {
        this.logger.error(this.logPrefix + 'failed to redirect to home page after delete: ' + this.expense.id, {reason})
      })
    }, raison => {
      this.logger.error(this.logPrefix + 'failed to delete expense: ' + this.expense.id, {raison});
    })
  }

  onBillUpload(bill: any) {
    if (this.expense && this.expense.id && !!bill) {
      this.expenseRepository.addBill(this.expense.id, bill).subscribe(updated => {
        this.expense = updated;
      })
    } else {
      this.logger.error(this.logPrefix + 'cannot send uploaded bill: required bill or expense\'s id is missing')
    }

  }

  download(url: string, filename: string) {
    DownloadUtils.run(url, filename);
  }

}


