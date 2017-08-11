import {Component, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'seer-card',
  styleUrls: ['./seer-card.scss'],
  templateUrl: './seer-card.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SeerCard {
  @Input() title:string;
  @Input() bigPadding:boolean = true;
}
