import {EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Component, Output} from '@angular/core';
import {Html5Qrcode} from "html5-qrcode"
import {ProductService} from "../../../../services/products/product.service";
import {Product} from "../../../../data-model/products/Product";
import {Subscription} from "rxjs";
import {CameraDevice, Html5QrcodeResult} from "html5-qrcode/core";

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

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const cameraID = extractCameraID(devices);
        this.html5QrCode = new Html5Qrcode("reader", false);
        this.html5QrCode
          .start(cameraID, cameraConfiguration, this.onReadCodeSuccess, () => {
          })
          .catch((err) => {
            this.cleanCamera();
          });
      }
    }).catch(err => {
      this.cleanCamera();
    });
  }

  private onReadCodeSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
    this.scanned.emit(decodedText);
    this.getProduct(decodedText);
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

const cameraConfiguration = {
  fps: 10,    // Optional, frame per seconds for qr code scanning
  qrbox: {width: 250, height: 250}  // Optional, if you want bounded box UI
};

function extractCameraID(devices: Array<CameraDevice>) {
  let cameraID = devices[0].id;
  // const cameraBackId = devices[1].id;
  if (devices.length > 1) {
    devices.forEach(device => {
      if (device.label.indexOf('back') !== -1) {
        cameraID = device.id;
      }
    })
  }
  return cameraID;
}
