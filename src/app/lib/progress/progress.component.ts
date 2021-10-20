import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'b4-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  items: any[] = [];

  @Input()
  public steps = 4;

  @Input()
  public active = 1;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.steps; i++) {
      (i === this.active) ?
        this.items.push({active: true, step: i}) : this.items.push({active: false, step: i});
    }
  }

}
