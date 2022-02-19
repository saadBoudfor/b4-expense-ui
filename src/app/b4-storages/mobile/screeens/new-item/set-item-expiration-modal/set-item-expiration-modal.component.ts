import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigService} from "../../../../../b4-common/services/config.service";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'set-item-expiration-modal',
  templateUrl: './set-item-expiration-modal.component.html',
  styleUrls: ['./set-item-expiration-modal.component.scss']
})
export class SetItemExpirationModalComponent implements OnInit {

  expirationDuration: { days?: number, hours?: number, minutes?: number } = {};
  theme = 'default';

  constructor(
    private configService: ConfigService,
    private overlayContainer: OverlayContainer,
    public dialogRef: MatDialogRef<SetItemExpirationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { days?: number, hours?: number, minutes?: number },
  ) {
    if (!!data) {
      this.expirationDuration = data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.configService.getSelectedTheme().subscribe(selected => {
      this.overlayContainer.getContainerElement().classList.add(selected);
    });
  }

}
