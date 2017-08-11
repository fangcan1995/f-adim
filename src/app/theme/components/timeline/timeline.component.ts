import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';

@Component({
  selector: 'timeline',
  styleUrls: ['./component.scss', './default.scss'],
  templateUrl: './timeline.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelineComponent{
  @Input() list:{name?,createTime?,className?,censorStaff?,approvalOpinion?}[];
  @Input() containerStyle:any;

  split(datetime){
    return datetime.split(' ');
  }
}
