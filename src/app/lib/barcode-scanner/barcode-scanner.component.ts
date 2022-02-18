import {EventEmitter, OnInit} from '@angular/core';
import {Component, Output} from '@angular/core';
import {Html5Qrcode} from "html5-qrcode"
import {ProductService} from "../../b4-expenses/services/product.service";
import {Product} from "../../b4-expenses/models/expenses/Product";
import {Location} from "@angular/common";

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit {

  @Output()
  scanned = new EventEmitter<string>();

  @Output()
  scannedProduct = new EventEmitter<Product>();

  @Output()
  close = new EventEmitter<boolean>();

  setBarCodeManually = false;
  barCode: string = '';

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
        console.log(devices);
        const html5QrCode = new Html5Qrcode("reader", false);
        html5QrCode.start(
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
          });
      }
    }).catch(err => {
    });
  }

  getProduct(barCode: string) {
    this.productService.getByCode(barCode).subscribe(product => {
      this.scannedProduct.emit(product);
    })
  }

}
