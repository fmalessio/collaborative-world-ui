import { Injectable } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Entry, File } from '@ionic-native/file/ngx';
import jsPDF from 'jspdf';
import { ProgressBarService } from 'src/app/shared/service/progress-bar.service';

const MIME_TYPE_PDF: string = 'application/pdf';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  fileTransfer: FileTransferObject;

  constructor(
    private file: File,
    private transfer: FileTransfer,
    private documentViewer: DocumentViewer,
    private progressBarService: ProgressBarService
  ) {
    this.fileTransfer = this.transfer.create();
  }

  viewDocument(path: string, mimeType: string, options?: DocumentViewerOptions) {
    this.documentViewer.viewDocument(
      path,
      mimeType,
      options ? options : {}
    );
  }

  generatePdf(doc: jsPDF, fileName: string): Promise<string> {
    this.progressBarService.setShow(true);
    let pdfOutput = doc.output();
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
      array[i] = pdfOutput.charCodeAt(i);
    }
    // Android
    const dir = `${this.file.externalRootDirectory}/Download`;
    return this.file.writeFile(dir, fileName, buffer)
      .then((entry: Entry) => {
        const options: DocumentViewerOptions = {
          title: entry.name,
          email: { enabled: true },
          print: { enabled: true },
          openWith: { enabled: true }
        };
        this.progressBarService.setShow(false);
        this.viewDocument(dir + '/' + fileName, MIME_TYPE_PDF, options);
        return "Archivo PDF creado: " + entry.fullPath;
      })
      .catch((error) => {
        this.progressBarService.setShow(false);
        return "No se ha podido crear el archivo: " + JSON.stringify(error);
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
        // todo: error
      });
  }
}
