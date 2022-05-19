import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemRepository} from "../../../../../repositories/storages/item-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {Item} from "../../../../../data-model/storages/Item";
import {Subscription} from "rxjs";
import {UpdateQuantity} from "../../../../../data-model/storages/UpdateQuantity";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  // template vars
  itemInformation: { key: string, value?: string, action?: 'update_quantity' }[] = [];
  nutritionalInformation: { key: string, value?: string }[] = [];
  product_photo!: string | undefined;

  // components vars
  private $itemFetchDetailRq!: Subscription;
  private itemId!: number;
  private remaining: number | undefined;
  updateHistory!: UpdateQuantity[] | undefined;
  unit: string | undefined;

  constructor(private itemRepository: ItemRepository,
              private logger: NGXLogger,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.itemId = this.extractItemId();

    this.$itemFetchDetailRq = this.itemRepository.getById(this.itemId)
      .subscribe(item => this.displayItemDetails(item));

  }

  ngOnDestroy(): void {
    if (!!this.$itemFetchDetailRq) {
      this.$itemFetchDetailRq.unsubscribe();
    }
  }

  updateQuantity() {
    if (!!this.itemId) {
      this.router.navigate(['/storage/item/update'], {queryParams: {itemId: this.itemId, remaining: this.remaining}})
        .then(() => {
          this.logger.info('redirect to update quantity page. item id: ' + this.itemId);
        }).catch(() => {
        this.logger.error('failed to redirect to update quantity page. item id: ' + this.itemId)
      })
    } else {
      this.logger.error('Item\'s id is missing');
    }

  }

  private extractItemId() {
    const itemId = this.activatedRoute.snapshot.queryParams['itemId'];
    try {
      if (!itemId) {
        this.logger.error('ItemId cannot be null');
        this.redirectToStorageHomePage();
      }
      const id = parseInt(itemId);
      if (id < 0) {
        this.logger.error('extracted itemId value is invalid: ' + id);
        this.redirectToStorageHomePage();
      }
      return id;
    } catch (error) {
      this.logger.error('failed to extract itemId from url');
      this.redirectToStorageHomePage();
      throw error; // if failed to redirect
    }
  }

  private displayItemDetails(item: Item) {
    let totalQuantity = '';
    if (item.product?.productQuantity) {
      totalQuantity = (item.product.productQuantity * item.quantity)
        + ' ' + item?.product?.unit;
    }

    this.itemInformation = [
      {key: 'Nom du produit', value: item.product?.name},
      {key: 'Quantité', value: totalQuantity},
      {key: 'Quantité restante', value: item?.remaining + ' ' + item?.product?.unit, action: 'update_quantity'},
      {key: 'Expire le', value: item?.expirationDate},
      {key: 'Expiration apres ouverture', value: '3 j'}
    ]

    this.nutritionalInformation = [
      {key: 'Calories', value: item?.product?.calories + ' kcal'},
      {key: 'Nutri-score', value: item?.product?.score?.toUpperCase()},
      {key: 'Matière grasses', value: item?.product?.nutrientLevels?.fat},
      {key: 'Glucides', value: item?.product?.nutrientLevels?.saturatedFat},
      {key: 'Sucres', value: item?.product?.nutrientLevels?.sugars},
      {key: 'Sel', value: item?.product?.nutrientLevels?.salt},
    ]
    this.remaining = item?.remaining;
    this.product_photo = item.product?.photo;
    this.updateHistory = item?.quantityHistory;
    this.unit = item?.product?.unit;
  }

  private redirectToStorageHomePage() {
    this.router.navigate(['/storage']).then(() => {
      this.logger.info('redirect to storage home page');
    })
  }
}
