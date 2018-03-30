import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap';

@Component({
  selector: 'seer-timepicker',
  templateUrl: './seer-timepicker.component.html',
  styleUrls: [ './seer-timepicker.component.scss' ],
})
export class SeerTimepickerComponent implements OnInit {
	ngOnInit() {
	}
  myTime: Date = new Date();


  hstep = 1;
  mstep = 1;
  sstep = 1;
  showMin: boolean = true;
  showSec: boolean = true;


}
