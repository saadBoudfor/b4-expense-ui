import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {BudgetComponent} from "./b4-expenses/screen/mobile/expenses/budget/display-budget/budget.component";
import {DefineBudgetComponent} from "./b4-expenses/screen/mobile/expenses/budget/define-budget/define-budget.component";
import {ProductListComponent} from "./b4-expenses/screen/mobile/expenses/product-list/product-list.component";
import {WelcomeStorageComponent} from "./b4-storages/mobile/screeens/welcome-storage/welcome-storage.component";
import {StorageDetailsComponent} from "./b4-storages/mobile/screeens/storage-details/storage-details.component";
import {StorageListComponent} from "./b4-storages/mobile/screeens/storage-list/storage-list.component";
import {NewStorageComponent} from "./b4-storages/mobile/screeens/new-storage/new-storage.component";
import {ItemDetailsComponent} from "./b4-storages/mobile/screeens/item-details/item-details.component";
import {NewItemComponent} from "./b4-storages/mobile/screeens/new-item/new-item.component";
import {NewBucketComponent} from "./b4-storages/mobile/screeens/new-bucket/new-bucket.component";
import {SettingsComponent} from "./b4-common/settings/settings.component";
import {UpdateQuantityComponent} from "./b4-storages/mobile/screeens/item-details/update-quantity/update-quantity.component";
import {ExpensesHomeComponent} from "./my-expenses/screens/expenses-home/expenses-home.component";
import {ExpensesActionComponent} from "./my-expenses/screens/expenses-action/expenses-action.component";
import {AddRestaurantExpenseComponent} from "./my-expenses/screens/add-restaurant-expense/add-restaurant-expense.component";
import {SelectHouseholdExpenseComponent} from "./my-expenses/screens/select-household-expense/select-household-expense.component";
import {AddHouseholdExpenseUnitComponent} from "./my-expenses/screens/add-household-expense-unit/add-household-expense-unit.component";
import {AddHouseholdExpenseListComponent} from "./my-expenses/screens/expense-list/add-household-expense-list/add-household-expense-list.component";
import {AddHouseholdExpenseLigneComponent} from "./my-expenses/screens/expense-list/add-household-expense-ligne/add-household-expense-ligne.component";
import {ValidateHouseholdExpenseListComponent} from "./my-expenses/screens/validate-household-expense-list/validate-household-expense-list.component";
import {SelectExpenseTypeComponent} from "./my-expenses/screens/select-expense-type/select-expense-type.component";
import {DisplayHouseholdExpenseListComponent} from "./my-expenses/screens/expense-list/display-household-expense-list/display-household-expense-list.component";
import {ExpenseDetailsComponent} from "./my-expenses/screens/expense-details/expense-details.component";
import {TopExpensesComponent} from "./my-expenses/screens/top-expenses/top-expenses.component";
import {DisplayBudgetComponent} from "./my-expenses/screens/display-budget/display-budget.component";
import {UpdateBudgetComponent} from "./my-expenses/screens/update-budget/update-budget.component";

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
  {path: 'expenses-by-place/storage', component: ExpensesByPlaceComponent},
  {path: 'holdhouse-expense-type', component: HoldhouseExpensesTypeComponent},
  {path: 'budget', component: BudgetComponent},
  {path: 'budget/define', component: DefineBudgetComponent},
  {path: 'product-list', component: ProductListComponent},

  // Storage endpoints
  {path: 'storage', component: StorageDetailsComponent},
  {path: 'storage/welcome', component: WelcomeStorageComponent},
  {path: 'storage/list', component: StorageListComponent},
  {path: 'storage/new', component: NewStorageComponent},
  {path: 'storage/item', component: ItemDetailsComponent},
  {path: 'storage/item/new', component: NewItemComponent},
  {path: 'storage/item/update', component: UpdateQuantityComponent},
  {path: 'storage/bucket/new', component: NewBucketComponent},


  // Other endpoints
  {path: 'settings', component: SettingsComponent},

  // Expenses endpoints
  {path: 'expenses/home', component: ExpensesHomeComponent},
  {path: 'expenses/action', component: ExpensesActionComponent},
  {path: 'expenses/details', component: ExpenseDetailsComponent},
  {path: 'expenses/select', component: SelectExpenseTypeComponent},
  {path: 'expenses/restaurant-expense/new', component: AddRestaurantExpenseComponent},
  {path: 'expenses/household-expense/select', component: SelectHouseholdExpenseComponent},
  {path: 'expenses/household-expense-unit/new', component: AddHouseholdExpenseUnitComponent},
  {path: 'expenses/household-expense-list/new', component: AddHouseholdExpenseListComponent},
  {path: 'expenses/household-expense-list/expense-line/new', component: AddHouseholdExpenseLigneComponent},
  {path: 'expenses/household-expense-list/expense-line/list', component: DisplayHouseholdExpenseListComponent},
  {path: 'expenses/household-expense-list/validate', component: ValidateHouseholdExpenseListComponent},
  {path: 'expenses/top/restaurants', component: TopExpensesComponent},
  {path: 'expenses/top/stores', component: TopExpensesComponent},
  {path: 'expenses/budget', component: DisplayBudgetComponent},
  {path: 'expenses/budget/update', component: UpdateBudgetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
