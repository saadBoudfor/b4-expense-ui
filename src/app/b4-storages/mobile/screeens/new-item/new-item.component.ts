import {Component, OnInit} from '@angular/core';
import {Item} from "../../../data-models/Item";
import {MatDialog} from "@angular/material/dialog";
import {SetItemExpirationModalComponent} from "./set-item-expiration-modal/set-item-expiration-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemRepository} from "../../../repositories/item-repository.service";
import {NGXLogger} from "ngx-logger";
import {Product} from "../../../../b4-expenses/models/expenses/Product";

@Component({
  selector: 'new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  isFilteringProduct: boolean = false;
  item = new Item();
  productName = '';
  availableQuantity!: number;
  expirationDuration = '';
  expirationDate!: Date;
  isScanningProduct = false;
  openDate!: Date;


  constructor(public dialog: MatDialog,
              private itemRepository: ItemRepository,
              private logger: NGXLogger,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const bucketId = this.activatedRoute.snapshot.queryParams['bucketId'];
    this.item.location = {id: bucketId};
    this.item.author = {id: 1};
  }


  selected(product: any) {
    this.productName = product.name;
    this.item.product = product;
    this.updateAvailableQuantity();
    this.isFilteringProduct = false;
  }

  updateAvailableQuantity() {
    if (this.item.product && this.item.product.productQuantity) {
      this.availableQuantity = this.item.quantity * this.item.product.productQuantity;
    }
  }

  updateExpiration() {
    const dialogRef = this.dialog.open(SetItemExpirationModalComponent, {data: this.item.expirationAfter});
    dialogRef.afterClosed().subscribe(data => {
      this.item.expirationAfter = {};
      if (!!data) {
        this.expirationDuration = '';
        if (!!data.days) {
          this.expirationDuration += data.days + ' jours ';
          this.item.expirationAfter.days = data.days;
        }
        if (!!data.hours) {
          this.expirationDuration += data.hours + ' heures ';
          this.item.expirationAfter.hours = data.hours;
        }
        if (!!data.minutes) {
          this.expirationDuration += data.minutes + ' minutes';
          this.item.expirationAfter.minutes = data.minutes;
        }
      }
    })
  }

  add() {
    this.item.remaining = this.availableQuantity;
    if (!!this.expirationDate) {
      this.item.expirationDate = this.expirationDate.toISOString().split('T')[0];
    }

    if (!!this.openDate) {
      this.item.openDate = this.openDate.toISOString().split('T')[0];
    }

    this.item.addDate = new Date().toISOString().split('T')[0];
    this.itemRepository.save(this.item).subscribe(item => {
      this.logger.info('saved item success', {item});
      this.router.navigate(['/storage']).then(() => {
        this.logger.debug('redirect to storage home page');
      })
    })
  }

  onScanProduct(product: Product) {
    this.item.product = product;
    this.isScanningProduct = false;
  }


}