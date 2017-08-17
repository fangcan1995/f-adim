import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Animations } from '../../../theme/animations/animations';
@Component({
  selector: 'seer-collapse-card',
  templateUrl: './seer-collapse-card.component.html',
  styleUrls: ['./seer-collapse-card.component.scss'],
  animations: [ Animations.slideInOut ]
})
export class SeerCollapseCardComponent implements OnInit, OnChanges {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType:String;
  @Input() canCollapse: boolean = false;
  @Input() defaultExpand: boolean = true;
  private _isExpanded: boolean = false;
  constructor() {}
  ngOnInit() {
  	this._isExpanded = this.canCollapse ? this.defaultExpand : true;
  }
  ngOnChanges() {
  	this._isExpanded = this.canCollapse ? this.defaultExpand : true;
  }
  isExpanded() {
    return this._isExpanded.toString()
  }
  handleHeaderClick() {
  	this._isExpanded = this.canCollapse ? !this._isExpanded : true;
  }
}