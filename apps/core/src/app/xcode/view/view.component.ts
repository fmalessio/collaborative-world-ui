import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { jsPDF } from "jspdf";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  value: string;
  fileTransfer: FileTransferObject;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private file: File,
    private transfer: FileTransfer
  ) {
    this.fileTransfer = this.transfer.create();
  }

  ngOnInit() {
    const plainValue = this.activatedRoute.snapshot.paramMap.get('value');
    this.value = btoa(plainValue);
  }

  printPDF() {
    var canvas = document.getElementById('qrdatacode')?.getElementsByTagName('canvas')[0];
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }
    var dataURL = canvas.toDataURL();
    let doc = new jsPDF();
    doc.setProperties({ author: 'Collavorative World' });
    doc.setFont("helvetica");
    doc.setFontSize(9);
    doc.addImage(dataURL, 'JPG', 10, 10, 60, 60)
      .text(btoa(this.value), 10, 70)
      .text(new Date().toJSON().slice(0, 10).replace(/-/g, '/'), 10, 75);
    this.downloadPdf(doc);
  }

  downloadPdf(doc: jsPDF) {
    let pdfOutput = doc.output();
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
      array[i] = pdfOutput.charCodeAt(i);
    }
    // Android
    const dir = `${this.file.externalRootDirectory}/Download`;
    const fileName = `cw-${Date.now()}.pdf`;
    this.file.writeFile(dir, fileName, buffer)
      .then((success) => this.message = "File created Succesfully" + JSON.stringify(success))
      .catch((error) => this.message = "Cannot Create File " + JSON.stringify(error));
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
