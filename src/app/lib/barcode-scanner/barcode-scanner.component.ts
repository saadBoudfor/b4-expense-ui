import {EventEmitter, OnInit} from '@angular/core';
import { Component, Output} from '@angular/core';
import {Html5Qrcode} from "html5-qrcode"

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit {

  @Output()
  scanned = new EventEmitter<string>();

  ngOnInit() {
    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("reader", false);
        html5QrCode.start(
          cameraId,
          {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: {width: 250, height: 250}  // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            this.scanned.emit(decodedText);
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

}
