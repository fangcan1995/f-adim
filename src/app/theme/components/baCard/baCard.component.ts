import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'ba-card',
  template: './baCard.html',
  styleUrls: ['./baCard.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaCard {
  @Input() title:String;
  @Input() baCardClass:String;
}
