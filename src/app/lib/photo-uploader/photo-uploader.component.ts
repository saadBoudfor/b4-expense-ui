import {EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../b4-common/services/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit, OnDestroy {

  @Output()
  upload = new EventEmitter();

  file: any;
  preview: string | ArrayBuffer | null = null;

  @Input()
  title = "Photo";

  @Input()
  color: 'primary' | 'accent' = 'primary';

  private $subscription!: Subscription;
  isDark: boolean = false;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.$subscription = this.configService.getSelectedTheme()
      .subscribe(theme => {
        this.isDark = (theme == 'dark-theme')
      })
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

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}
