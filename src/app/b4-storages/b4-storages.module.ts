import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {LibModule} from "../lib/lib.module";
import {AngularImports} from "../angular-imports";
import {B4CommonModule} from "../b4-common/b4-common.module";
import {WebcamModule} from "ngx-webcam";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";


@NgModule({
  declarations: [
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
    FormsModule,
    B4CommonModule,
    RouterModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ]
})
export class B4StoragesModule {
}
