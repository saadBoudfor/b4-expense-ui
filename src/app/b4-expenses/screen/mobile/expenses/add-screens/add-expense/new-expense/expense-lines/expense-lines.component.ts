import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Expense} from "../../../../../../../models/Expense";
import {Product} from "../../../../../../../models/Product";
import {ExpenseRepository} from "../../../../../../../repositories/expenses/expense-repository.service";
import {ConfirmationService} from "../../../../../../../../b4-common/services/confirmation.service";
import {ExpenseLine} from "../../../../../../../models/ExpenseLine";
import {ExpenseService} from "../../../../../../../services/expenses/expense.service";

@Component({
  selector: 'expense-lines',
  templateUrl: './expense-lines.component.html',
  styleUrls: ['./expense-lines.component.scss']
})
export class ExpenseLinesComponent implements OnInit {
  title = '';
  expense = new Expense();
  bill: any;
  selected: ExpenseLine | undefined | null;

  constructor(private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              private expenseService: ExpenseService,
              private expenseRepository: ExpenseRepository) {
  }

  ngOnInit(): void {
    const data = this.expenseService.getDraftExpense();
    this.expense = data.expense;
    this.bill = data.bill;
    this.translateService.get('screen.new.expense.title')
      .subscribe(title => this.title = title);
  }


  submit() {
    this.expenseRepository.save(this.expense, this.expense.bill).subscribe(saved => {
      this.confirmationService.displayConfirmationMessage({
        message: "C'est dans la poche. Votre déponse " + saved.name + ' à été sauvegardé avec succès.',
        steps: 2,
        active: 2,
        page: '/b4-expenses',
        success: true,
        title: this.title
      })
    }, (error) => {
      console.error("Erreur on add new expense ", {expense: this.expense, error: error});
      this.confirmationService.displayConfirmationMessage({
        message: "Erreur " + error.code + " La dépense " + this.expense.name + " n'à pas été sauvegardé. Merci de contacter votre administrateur",
        steps: 2,
        active: 2,
        page: '/b4-expenses',
        success: false,
        title: this.title
      })
    })
  }

  canAddExpense() {
    return this.expenseService.isExpenseValid(this.expense);
  }

  onDelete(expenseLine: ExpenseLine) {
    this.selected = null;
    console.warn('delete expense line' + {expenseLine});
    this.expense.expenseLines = this.expense.expenseLines.filter(item => item.product !== expenseLine.product)
    this.expenseService.updateDraftExpense(this.expense, this.bill);
  }

  onSelect($event: ExpenseLine) {
    this.selected = $event;
  }

  onCloseDetails($event: any) {
    console.log('close details', {expenseLine: this.selected});
    this.selected = null;
  }
}
