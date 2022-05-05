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
import {WelcomeStorageComponent} from './mobile/screeens/welcome-storage/welcome-storage.component';
import {StorageDetailsComponent} from './mobile/screeens/storage-details/storage-details.component';
import {BucketSummaryComponent} from './mobile/components/bucket-summary/bucket-summary.component';
import {PeriodPipe} from './mobile/pipes/period.pipe';
import {StorageListComponent} from './mobile/screeens/storage-list/storage-list.component';
import {NewStorageComponent} from './mobile/screeens/new-storage/new-storage.component';
import {ItemDetailsComponent} from './mobile/screeens/item-details/item-details.component';
import {NewItemComponent} from './mobile/screeens/new-item/new-item.component';
import {NewBucketComponent} from './mobile/screeens/new-bucket/new-bucket.component';
import {SetItemExpirationModalComponent} from './mobile/screeens/new-item/set-item-expiration-modal/set-item-expiration-modal.component';
import {TotalQuantityPipe} from './mobile/pipes/total-quantity.pipe';
import {ItemComponent} from './mobile/components/item/item.component';
import {UpdateQuantityComponent} from './mobile/screeens/item-details/update-quantity/update-quantity.component';


@NgModule({
  declarations: [
    WelcomeStorageComponent,
    StorageDetailsComponent,
    BucketSummaryComponent,
    PeriodPipe,
    StorageListComponent,
    NewStorageComponent,
    ItemDetailsComponent,
    NewItemComponent,
    NewBucketComponent,
    SetItemExpirationModalComponent,
    TotalQuantityPipe,
    ItemComponent,
    UpdateQuantityComponent
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
