import {Component, OnInit} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {BucketRepository} from "../../../repositories/bucket-repository.service";
import {StorageRepository} from "../../../repositories/storage-repository.service";
import {Storage} from "../../../data-models/Storage";
import {StorageService} from "../../../services/storage.service";
import {Bucket} from "../../../data-models/Bucket";
import {Item} from "../../../data-models/Item";

@Component({
  selector: 'storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss']
})
export class StorageDetailsComponent implements OnInit {
  storage!: Storage;
  private storageId: number | null = null;

  constructor(private ngxLogger: NGXLogger,
              private storageService: StorageService,
              private bucketRepository: BucketRepository,
              private storageRepository: StorageRepository,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ngxLogger.info('load data for default storage');
    this.storageId = this.storageService.getSavedStorageId();
    if (!!this.storageId) {
      this.storageRepository.get(this.storageId).subscribe(saved => {
        this.storage = saved;
      })
    }
  }

  addNewItem(bucket: Bucket) {
    this.router.navigate(['/storage/item/new'], {queryParams: {bucketId: bucket.id}})
  }

  newBucket() {
    this.router.navigate(['/storage/bucket/new'], {queryParams: {storageId: this.storageId}});
  }

  openDetails(item: Item) {
    this.ngxLogger.info('open item "' + item?.product?.name + '" (id=' + item?.id + ') details');
    this.router.navigate(['/storage/item'], {queryParams: {itemId: item.id}});
  }
}

