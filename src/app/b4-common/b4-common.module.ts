import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibModule} from "../lib/lib.module";
import {AngularImports} from "../angular-imports";
import {RouterModule} from "@angular/router";
import {WebcamModule} from "ngx-webcam";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {PlaceAutocompleteComponent} from './place-autocomplete/place-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BudgetTargetDisplayerComponent} from './budget-target-displayer/budget-target-displayer.component';
import {BarChartItemComponent} from './bar-chart-item/bar-chart-item.component';
import {BarChartExpenseComponent} from './bar-chart-expense/bar-chart-expense.component';
import { DatePipe } from './pipes/date/date.pipe';
import { MobileLateralMenuComponent } from './mobile-lateral-menu/mobile-lateral-menu.component';
import { SettingsComponent } from './settings/settings.component';
import {SearchProductComponent} from "./search-product/search-product.component";
import {ProductPhotoPipe} from "./pipes/productPhoto/product-photo.pipe";

@NgModule({
  declarations: [
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    BarChartItemComponent,
    BarChartExpenseComponent,
    DatePipe,
    MobileLateralMenuComponent,
    SettingsComponent,
    SearchProductComponent,
    ProductPhotoPipe
  ],
  exports: [
    PlaceAutocompleteComponent,
    BudgetTargetDisplayerComponent,
    BarChartExpenseComponent,
    DatePipe,
    MobileLateralMenuComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    AngularImports,
    LibModule,
    RouterModule,
    WebcamModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class B4CommonModule {
}
