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
  @Input() id;
  @Input() name;
	@Input() minDate;
	@Input() maxDate;
  @Input() disabled;
	@Input() dateFormatingRules:string = 'yyyy/MM/dd';
	@Input() readonly:boolean=true; //edit by lily
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
/*
2017-11-9 lily 修改
1、添加可以设置组件是否自读的入参 readonly
*/
}
