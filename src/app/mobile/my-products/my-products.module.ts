import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarcodeScannerComponent} from "./screens/barcode-scanner/barcode-scanner.component";
import {SearchProductComponent} from "./screens/search-product/search-product.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularImports} from "../../angular-imports";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";
import {WebcamModule} from "ngx-webcam";
import {LibModule} from "../../lib/lib.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {B4CommonModule} from "../b4-common/b4-common.module";
import {ProductPhotoPipe} from "./pipes/productPhoto/product-photo.pipe";
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { ProductCategoriesComponent } from './screens/product-categories/product-categories.component';
import { SaveProductComponent } from './screens/save-product/save-product.component';


/**
 * Manage products
 *  - search product
 *  - update product
 *  - create new product
 *  - scan product barcode
 */
@NgModule({
  declarations: [BarcodeScannerComponent, SearchProductComponent, ProductPhotoPipe, ProductDetailsComponent, ProductCategoriesComponent, SaveProductComponent],
    exports: [BarcodeScannerComponent, SearchProductComponent, ProductDetailsComponent],
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
    ReactiveFormsModule,
    B4CommonModule
  ]
})
export class MyProductsModule {
}
