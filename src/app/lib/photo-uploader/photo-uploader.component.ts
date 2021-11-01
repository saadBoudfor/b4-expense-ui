import {EventEmitter, Input, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {

  @Output()
  upload = new EventEmitter();

  file: any;
  preview: string | ArrayBuffer | null = null;

  @Input()
  title = "Photo";

  @Input()
  color: 'primary' | 'accent' = 'primary';

  constructor() {
  }

  ngOnInit(): void {
  }

  processPhoto(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.upload.emit(this.file);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target ? e.target.result : null;
      }
      reader.readAsDataURL(this.file);
    }
  }
}
