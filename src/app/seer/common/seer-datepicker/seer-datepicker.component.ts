import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,

} from '@angular/core';
import { DatePipe } from '@angular/common';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
defineLocale('zh-cn', zhCn);

@Component({
  selector: 'seer-datepicker',
  templateUrl: './seer-datepicker.component.html',
  styleUrls: [ './seer-datepicker.component.scss' ],
})
export class SeerDatepickerComponent implements OnInit {
	@Input() minDate;
	@Input() maxDate;
  @Input() disabled;
	@Input() dateFormatingRules:string = 'yyyy年MM月dd日';
	bsConfig: Partial<BsDatepickerConfig> = {
	  locale: 'zh-cn',
	  showWeekNumbers: false,
	};
	ngOnInit() {
	}
	dateValue: Date;
	@Output() dateChange = new EventEmitter();
  @Input()
  get date() {
    return this.dateValue;
  }
  set date(val) {
  	this.dateValue = val;
    this.dateChange.emit(this.dateValue);
  }
}
