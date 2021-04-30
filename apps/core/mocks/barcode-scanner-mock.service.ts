import { Injectable } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerMockService {

  constructor() { }

  scan(options?: BarcodeScannerOptions): Promise<BarcodeScanResult> {
    let code = 'NCC-1701';
    let theResult: BarcodeScanResult = { format: 'QR_CODE', cancelled: false, text: code };

    return new Promise((resolve, reject) => {
      resolve(theResult);
    });
  }
}
