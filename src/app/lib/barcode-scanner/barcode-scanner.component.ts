import {EventEmitter} from '@angular/core';
import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from "ngx-barcode-scanner";

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements AfterViewInit {

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  @Output()
  scanned = new EventEmitter<string>();

  barcodeValue: any;

  ngAfterViewInit() {
    if (this.barcodeScanner)
      this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
    this.scanned.emit(this.barcodeValue);
  }

  onStarted(started: any) {
    console.log(started);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
