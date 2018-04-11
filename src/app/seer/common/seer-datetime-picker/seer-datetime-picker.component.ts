import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from '@angular/core';
import { typeSourceSpan } from '@angular/compiler';

declare let laydate;

@Component({
    selector: 'seer-datetime-picker',
    templateUrl: './seer-datetime-picker.component.html',
    styleUrls: ['./seer-datetime-picker.component.scss'],
})
export class SeerDateTimePickerComponent implements OnInit {
    @Input() id: string;

    ngOnInit() {
        laydate.render({
            elem: '#test',// + this.id,
            type: 'datetime',
            done: (value, date, endDate) => {
                this.myTime = value;
                console.log(this.myTime);
            }
        })

    } 

    dateValue: Date;
    @Output() dateChange = new EventEmitter();

    @Input() get myTime() {
        return this.dateValue;
    }

    set myTime(val) {
        this.dateValue = val;
        this.dateChange.emit(this.dateValue);
    }


}
