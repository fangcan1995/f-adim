import {Component, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'workflow',
  styleUrls: ['./workflow.component.scss'],
  templateUrl: './workflow.component.html',
  encapsulation: ViewEncapsulation.None
})
export class WorkflowComponent {
  @Input() tasks:{className?:string, level?: number, name?: string}[];
}
