import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewProductComponent} from "./expenses/screen/new-product/new-product.component";
import {ConfirmationComponent} from "./b4-common/confirmation/confirmation.component";
import {NewExpenseUnitComponent} from "./expenses/screen/new-expense-unit/new-expense-unit.component";
import {SearchProductComponent} from "./expenses/screen/search-product/search-product.component";
import {NewExpenseComponent} from "./expenses/screen/new-expense/new-expense.component";
import {ExpenseLinesComponent} from "./expenses/screen/new-expense/expense-lines/expense-lines.component";
import {AddExpenseLineComponent} from "./expenses/screen/new-expense/add-expense-line/add-expense-line.component";
import {ExpensesTypeComponent} from "./expenses/screen/expenses-type/expenses-type.component";
import {HoldhouseExpensesTypeComponent} from "./expenses/screen/holdhouse-expenses-type/holdhouse-expenses-type.component";
import {HomeComponent} from "./expenses/screen/home/home.component";
import {AddActionComponent} from "./expenses/screen/add-action/add-action.component";
import {BarcodeScannerComponent} from "./lib/barcode-scanner/barcode-scanner.component";
import {AllExpensesComponent} from "./expenses/screen/all-expenses/all-expenses.component";
import {ExpensesByPlaceComponent} from "./expenses/screen/expenses-by-place/expenses-by-place.component";
import {ExpenseDetailsComponent} from "./expenses/screen/expense-details/expense-details.component";
import {BudgetComponent} from "./expenses/screen/budget/budget.component";
import {DefineBudgetComponent} from "./expenses/screen/define-budget/define-budget.component";

const routes: Routes = [
  {path: 'expenses', component: HomeComponent},
  {path: 'expense-details', component: ExpenseDetailsComponent},
  {path: 'bar-code-scanner', component: BarcodeScannerComponent},
  {path: 'add', component: AddActionComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'new-expense-unit', component: NewExpenseUnitComponent},
  {path: 'new-expense-restaurant', component: NewExpenseUnitComponent},
  {path: 'new-expense-list', component: NewExpenseComponent},
  {path: 'add-expense-line', component: AddExpenseLineComponent},
  {path: 'expense-line-list', component: ExpenseLinesComponent},
  {path: 'search-product', component: SearchProductComponent},
  {path: 'expenses-type', component: ExpensesTypeComponent},
  {path: 'all-expenses', component: AllExpensesComponent},
  {path: 'expenses-by-place/restaurants', component: ExpensesByPlaceComponent},
  {path: 'expenses-by-place/stores', component: ExpensesByPlaceComponent},
  {path: 'holdhouse-expense-type', component: HoldhouseExpensesTypeComponent},
  {path: 'budget', component: BudgetComponent},
  {path: 'budget/define', component: DefineBudgetComponent},
  {path: '**', redirectTo: 'expenses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
