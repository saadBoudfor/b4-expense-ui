import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {Bucket} from "../../../../../data-model/storages/Bucket";
import {BucketRepository} from "../../../../../repositories/storages/bucket-repository.service";
import {IdValidator} from "../../../../b4-common/util/IdValidator";

@Component({
  selector: 'new-bucket',
  templateUrl: './new-bucket.component.html',
  styleUrls: ['./new-bucket.component.scss']
})
export class NewBucketComponent implements OnInit {
  storageId!: number;
  bucket = new Bucket();
  isUsed: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
              private bucketRepository: BucketRepository,
              private router: Router,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    const storageId = this.activatedRoute.snapshot.queryParams['storageId'];
    if (!IdValidator.isValidStr(storageId)) {
      this.logger.error('Cannot create new bucket for undefined storage');
      this.router.navigate(['/storage']).then(() => {
        this.logger.info('redirect to storage home page');
      });
    } else {
      this.storageId = parseInt(storageId);
    }
  }

  add() {
    this.bucket.storage = {id: this.storageId};
    this.bucket.owner = {id: 1}
    this.bucketRepository.save(this.bucket).subscribe(saved => {
      this.logger.info('save new bucket ' + this.bucket.name + ' for storage ' + this.storageId);
      this.router.navigate(['/storage']).then(() => {
        this.logger.info('redirect to storage home page');
      })
    })
  }

  checkIfExist() {
    if (!!this.bucket.name && this.bucket.name.length > 2) {
      this.bucketRepository.checkIfUsed(this.storageId, this.bucket.name).subscribe(check => {
        this.isUsed = check.existByName;
      })
    }
  }
}
