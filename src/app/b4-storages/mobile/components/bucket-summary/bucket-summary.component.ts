import {EventEmitter, Output} from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import {Bucket} from 'src/app/b4-storages/data-models/Bucket';
import {Item} from "../../../data-models/Item";
import {ItemRepository} from "../../../repositories/item-repository.service";

@Component({
  selector: 'bucket-summary',
  templateUrl: './bucket-summary.component.html',
  styleUrls: ['./bucket-summary.component.scss']
})
export class BucketSummaryComponent implements OnInit {

  @Input()
  bucket!: Bucket;

  @Output()
  newItem = new EventEmitter<string>();

  @Output()
  openItemDetails = new EventEmitter<Item>();

  constructor(private itemRepository: ItemRepository) {
  }

  ngOnInit(): void {
    if (this.bucket && this.bucket.id)
      this.itemRepository.getByLocation(this.bucket.id).subscribe(items => {
        this.bucket.items = items;
      })
  }

}
