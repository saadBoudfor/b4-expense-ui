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
export class BucketSummaryComponent {

  private _bucket!: Bucket;

  @Input()
  public set bucket(value: Bucket) {
    this._bucket = value;
    if (value && value.id) {
      this.itemRepository.getByLocation(value.id).subscribe(items => {
        this._bucket.items = items;
      })
    }
  }

  get bucket() {
    return this._bucket;
  }

  @Output()
  newItem = new EventEmitter<string>();

  @Output()
  openItemDetails = new EventEmitter<Item>();

  constructor(private itemRepository: ItemRepository) {
  }

}
