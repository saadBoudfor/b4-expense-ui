import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'budget-target-displayer',
  templateUrl: './budget-target-displayer.component.html',
  styleUrls: ['./budget-target-displayer.component.scss']
})
export class BudgetTargetDisplayerComponent implements OnInit {

  @Input()
  target = 0;

  @Input()
  total = 0;

  ngOnInit(): void {
  }


}
