import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import { FileManagerService } from 'src/app/file-manager/service/file-manager.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  value: string;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileManagerService: FileManagerService
  ) { }

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
    this.fileManagerService.downloadPdf(doc).then(m => this.message = m);
  }

}
