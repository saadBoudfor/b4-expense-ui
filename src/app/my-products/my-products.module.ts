import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarcodeScannerComponent} from "./screens/barcode-scanner/barcode-scanner.component";
import {SearchProductComponent} from "./screens/search-product/search-product.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularImports} from "../angular-imports";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {WebcamModule} from "ngx-webcam";
import {LibModule} from "../lib/lib.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {B4CommonModule} from "../b4-common/b4-common.module";
import {ProductPhotoPipe} from "./screens/productPhoto/product-photo.pipe";



@NgModule({
  declarations: [BarcodeScannerComponent, SearchProductComponent, ProductPhotoPipe],
  exports: [BarcodeScannerComponent, SearchProductComponent],
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
export class MyProductsModule { }
