import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import jsPDF from 'jspdf';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  fileTransfer: FileTransferObject;

  constructor(
    private file: File,
    private transfer: FileTransfer
  ) {
    this.fileTransfer = this.transfer.create();
  }

  downloadPdf(doc: jsPDF): Promise<string> {
    let pdfOutput = doc.output();
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
      array[i] = pdfOutput.charCodeAt(i);
    }
    // Android
    const dir = `${this.file.externalRootDirectory}/Download`;
    const fileName = `cw-${Date.now()}.pdf`;
    return this.file.writeFile(dir, fileName, buffer)
      .then((success) => {
        return "File created Succesfully" + JSON.stringify(success)
      })
      .catch((error) => {
        return "Cannot Create File " + JSON.stringify(error)
      });
  }

  downloadByBlob(blob: Blob, type: string) {
    const newBlob = new Blob([blob], { type: type });
    const data = window.URL.createObjectURL(newBlob);
    console.log(data);
    this.download(data);
  }

  download(path: string) {
    this.fileTransfer.download(path, this.file.dataDirectory + `cw-${Date.now()}.pdf`).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      throwError(error);
    });
  }

  upload() {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    };

    this.fileTransfer.upload('<file path>', '<api endpoint>', options)
      .then((data) => {
        // todo: success
      }, (err) => {
        // todo: success
      });
  }
}
