import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularImports} from "../angular-imports";
import {LibModule} from "../lib/lib.module";
import { NewProductComponent } from './screen/new-product/new-product.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {FormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";

@NgModule({
  declarations: [
    NewProductComponent
  ],
  imports: [
    CommonModule,
    LibModule,
    AngularImports,
    WebcamModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule
  ]
})
export class ExpensesModule { }
