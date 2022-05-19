import {Component, OnInit} from '@angular/core';
import {StorageRepository} from "../../../../../repositories/storages/storage-repository.service";
import {Storage} from "../../../../../data-model/storages/Storage";
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {ConfirmationService} from "../../../../../services/common/confirmation.service";
import {ConfigService} from "../../../../../services/common/config.service";
import * as utils from 'lodash';
import {Observable, of} from "rxjs";
import {filter, map} from "rxjs/operators";
import {StorageService} from "../../../../../services/storages/storage.service";

@Component({
  selector: 'storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent implements OnInit {
  storages: Storage[] = [];

  selectedStorageId: number | null = null;
  filtered!: Observable<Storage[]>;
  searchedTerm: string = '';


  constructor(private storageRepository: StorageRepository,
              private router: Router,
              private storageService: StorageService,
              private confirmationService: ConfirmationService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.debug('init storage list component');
    this.storageRepository.getAll()
      .subscribe(storages => this.initStorageListStats(storages),
        error => this.redirectToErrorPage(error))
  }

  private initStorageListStats(storages: Storage[]) {
    this.logger.info('Storages list loaded success', {storages});
    this.storages = storages;
    this.filtered = of(storages);
    if (storages && storages.length !== 0)
      this.loadSelectedStorageId(storages[0].id);
  }

  private loadSelectedStorageId(defaultId: number | undefined) {
    this.selectedStorageId = this.storageService.getSavedStorageId();
    if (!this.selectedStorageId && !utils.isUndefined(defaultId)) {
      this.logger.warn('cannot load selected storage id from localstorage. select first item in storages list')
      this.selectedStorageId = defaultId;
      this.storageService.updateSelectedStorageId(defaultId);
    }
  }

  private redirectToErrorPage(error: any) {
    this.logger.error('Failed to load storages list', {error});
    this.confirmationService.open({
      message: "Oups! erreur lors du chargement des espaces de stockages",
      steps: 0,
      active: 0,
      page: '/storages',
      success: false,
      title: 'Chargement en erreur'
    })
  }

  updateSelectedStorageId(storage: Storage) {
    if (!!storage.id) {
      this.logger.info('select storage: ' + storage.name);
      this.selectedStorageId = storage.id;
      this.storageService.updateSelectedStorageId(storage.id);
      this.router.navigate(['/storage']);
    }
  }

  onFilterStorage() {
    this.filtered = of(this.storages.filter(storage => {
      return storage.name && (storage.name.indexOf(this.searchedTerm) !== -1);
    }))
  }
}
