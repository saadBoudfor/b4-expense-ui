import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewProductComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/new-product/new-product.component";
import {ConfirmationComponent} from "./b4-common/confirmation/confirmation.component";
import {NewExpenseUnitComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/add-expense/new-expense-unit/new-expense-unit.component";
import {SearchProductComponent} from "./b4-expenses/screen/mobile/expenses/search-product/search-product.component";
import {NewExpenseComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/add-expense/new-expense/new-expense.component";
import {ExpenseLinesComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/add-expense/new-expense/expense-lines/expense-lines.component";
import {AddExpenseLineComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/add-expense/new-expense/add-expense-line/add-expense-line.component";
import {ExpensesTypeComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/expenses-type/expenses-type.component";
import {HoldhouseExpensesTypeComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/holdhouse-expenses-type/holdhouse-expenses-type.component";
import {HomeComponent} from "./b4-expenses/screen/mobile/expenses/home/home.component";
import {AddActionComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/add-action/add-action.component";
import {BarcodeScannerComponent} from "./lib/barcode-scanner/barcode-scanner.component";
import {AllExpensesComponent} from "./b4-expenses/screen/mobile/expenses/all-expenses/all-expenses.component";
import {ExpensesByPlaceComponent} from "./b4-expenses/screen/mobile/expenses/add-screens/expenses-by-place/expenses-by-place.component";
import {ExpenseDetailsComponent} from "./b4-expenses/screen/mobile/expenses/expense-details/expense-details.component";
import {BudgetComponent} from "./b4-expenses/screen/mobile/expenses/budget/display-budget/budget.component";
import {DefineBudgetComponent} from "./b4-expenses/screen/mobile/expenses/budget/define-budget/define-budget.component";
import {ProductListComponent} from "./b4-expenses/screen/mobile/expenses/product-list/product-list.component";

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
  {path: 'product-list', component: ProductListComponent},
  {path: '**', redirectTo: 'expenses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
