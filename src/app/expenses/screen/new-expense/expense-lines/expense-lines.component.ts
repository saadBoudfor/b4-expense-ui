import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Expense} from "../../../models/Expense";
import {Product} from "../../../models/Product";
import {ExpenseService} from "../../../services/expense.service";
import {ConfirmationService} from "../../../../b4-common/services/confirmation.service";
import {ExpenseLine} from "../../../models/ExpenseLine";

@Component({
  selector: 'expense-lines',
  templateUrl: './expense-lines.component.html',
  styleUrls: ['./expense-lines.component.scss']
})
export class ExpenseLinesComponent implements OnInit {
  title = '';
  expense = new Expense();
  iconPath = '/assets/products/';
  bill: any;

  constructor(private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    const data = this.expenseService.getDraftExpense();
    this.expense = data.expense;
    this.bill = data.bill;
    this.translateService.get('screen.new.expense.title')
      .subscribe(title => this.title = title);
  }


  submit() {
    this.expenseService.save(this.expense, this.expense.bill).subscribe(saved => {
      this.confirmationService.displayConfirmationMessage({
        message: "C'est dans la poche. Votre déponse " + saved.name + ' à été sauvegardé avec succès.',
        steps: 2,
        active: 2,
        page: '/new-expense-list',
        success: true,
        title: this.title
      })
    }, (error) => {
      console.error("Erreur on add new expense ", {expense: this.expense, error: error});
      this.confirmationService.displayConfirmationMessage({
        message: "Erreur " + error.code + " La dépense " + this.expense.name + " n'à pas été sauvegardé. Merci de contacter votre administrateur",
        steps: 2,
        active: 2,
        page: '/new-expense-list',
        success: false,
        title: this.title
      })
    })
  }

  canAddExpense() {
    return this.expenseService.isExpenseValid(this.expense);
  }

  onDelete(expenseLine: ExpenseLine) {
    alert('delete expense line' + {expenseLine});
  }
}
