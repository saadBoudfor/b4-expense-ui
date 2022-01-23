import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Expense} from "../../../../../../models/Expense";
import {Product} from "../../../../../../models/Product";
import {ExpenseRepository} from "../../../../../../repositories/expenses/expense-repository.service";
import {ConfirmationService} from "../../../../../../../b4-common/services/confirmation.service";
import {Place} from "../../../../../../../b4-common/models/Place";
import {Router} from "@angular/router";
import {ProductService} from "../../../../../../services/product.service";
import {ExpenseLine} from "../../../../../../models/ExpenseLine";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExpenseService} from "../../../../../../services/expenses/expense.service";

/**
 *  Add new unit expense ans restaurant expense
 */
@Component({
  selector: 'new-expense-unit',
  templateUrl: './new-expense-unit.component.html',
  styleUrls: ['./new-expense-unit.component.scss']
})
export class NewExpenseUnitComponent implements OnInit {
  expense = new Expense();
  maxDate = (new Date().toISOString()).split('T')[0];

  title: string | any;
  // Date default to today date
  selectingProduct: boolean = false;
  bill: File | any;
  selectedProduct: string = '';
  scanCode: boolean = false;

  constructor(private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              public router: Router,
              private snackBar: MatSnackBar,
              private expenseService: ExpenseService,
              private expenseRepository: ExpenseRepository,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.expense.expenseLines.push(new ExpenseLine());
    this.translateService.get('screen.new.expense.title')
      .subscribe(title => this.title = title);
  }

  selectProduct() {
    this.selectingProduct = true;
  }

  onSelectProduct(selectedProduct: any | Product) {
    console.log('selected product:', {selected: selectedProduct});
    this.expense.expenseLines[0].product = selectedProduct; // to build expense model
    this.selectedProduct = selectedProduct.name; //  for template display (binding)
    this.selectingProduct = false;
  }

  uploadBill(file: any) {
    this.bill = file;
  }

  submitExpense() {
    this.expense.author = {
      id: 1,
      name: "saad",
      lastname: "boudfor",
      email: "saad.boudfor@b4expenses.com",
      username: "sboudfor"
    };
    this.expense.user = {
      id: 1,
      name: "saad",
      lastname: "boudfor",
      email: "saad.boudfor@b4expenses.com",
      username: "sboudfor"
    };
    this.expenseRepository.save(this.expense, this.bill).subscribe(saved => {
        console.log('saved: ', {saved});
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
      }
    )
  }

  onSelectPlace(selectedPlace: Place) {
    this.expense.place = selectedPlace;
  }

  onScanCode(code: string) {
    this.scanCode = false;
    this.productService.getByCode(code).subscribe(found => {
      this.expense.expenseLines[0].product = found;
      this.selectedProduct = found.name; //  for template display (binding)
    }, error => {
      this.snackBar.open('Produit avec le code barre ' + code + ' inconnu', '', {duration: 3000});
    })
  }

  canAddExpense() {
    return this.expenseService.isExpenseValid(this.expense);
  }
}
