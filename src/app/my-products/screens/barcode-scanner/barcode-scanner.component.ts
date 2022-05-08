import {EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Component, Output} from '@angular/core';
import {Html5Qrcode} from "html5-qrcode"
import {Location} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {Subscription} from "rxjs";

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {

  @Output()
  scanned = new EventEmitter<string>();

  @Output()
  scannedProduct = new EventEmitter<Product>();

  @Output()
  close = new EventEmitter<boolean>();

  setBarCodeManually = false;
  barCode: string = '';
  private $productSubscription!: Subscription;
  private html5QrCode!: Html5Qrcode;

  constructor(private productService: ProductService, public location: Location) {
  }

  ngOnInit() {
    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        let cameraID = devices[0].id;
        // const cameraBackId = devices[1].id;
        if (devices.length > 1) {
          devices.forEach(device => {
            if (device.label.indexOf('back') !== -1) {
              cameraID = device.id;
            }
          })
        }
        this.html5QrCode = new Html5Qrcode("reader", false);
        this.html5QrCode.start(
          cameraID,
          {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: {width: 250, height: 250}  // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            this.scanned.emit(decodedText);
            this.getProduct(decodedText);
          },
          (errorMessage) => {
            // parse error, ignore it.
          })
          .catch((err) => {
            this.cleanCamera();
          });
      }
    }).catch(err => {
      this.cleanCamera();

    });
  }

  getProduct(barCode: string) {
    this.$productSubscription = this.productService.getByCode(barCode).subscribe(product => {
      this.scannedProduct.emit(product);
    })
  }

  ngOnDestroy(): void {
    if (!!this.$productSubscription) {
      this.$productSubscription.unsubscribe();
    }

    this.cleanCamera();
  }

  cleanCamera() {
    if (!!this.html5QrCode) {
      this.html5QrCode.stop();
      this.html5QrCode.clear();
    }
  }

}
