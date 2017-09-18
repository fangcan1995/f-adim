import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'seer-simple-table',
  templateUrl: './seer-simple-table.component.html',
  styleUrls: ['./seer-simple-table.component.scss'],
})
export class SeerSimpleTableComponent implements OnInit {
  @Input() titles;
  @Input() data;
  @Input() translate;
  public rowsOnPage = 10;
  public sortBy = '';
  constructor() {

  }
  ngOnInit() {

  }

  getData() {
    if ( this.translate ) {
      _.each(this.data, item => {
        this.transferKeyWithDict(item, this.translate, 1);
      });
    }
    return this.data;
  }
  transferKeyWithDict(obj: any, translate_copy: any, direction?: boolean | number): void {
    if ( direction ) {
      _.each(obj, (v, k) => {
        if (translate_copy[k]) {
         _.each(translate_copy[k], (cv, ck) => {
            if ( v == cv.dictValueId ) v = cv.dictValueName;
         })
        }
      })
    } else {
      _.each(obj, (v, k) => {
        if (translate_copy[k]) {
         _.each(translate_copy[k], (cv, ck) => {
            if ( v == cv.dictValueName ) v = cv.dictValueId;
         })
        }
      })
    }
    
  }
}