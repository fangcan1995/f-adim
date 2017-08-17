import { Component, Input } from '@angular/core';
@Component({
  selector: 'seer-folding-card',
  templateUrl: './seer-folding-card.component.html',
  styleUrls: ['./seer-folding-card.component.scss'],
})
export class SeerFoldingCardComponent {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType:String;
  constructor() {}
}