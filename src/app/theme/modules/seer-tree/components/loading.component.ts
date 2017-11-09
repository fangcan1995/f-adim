import { Component, Input, TemplateRef } from '@angular/core'
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: `<span *ngIf="!loadingTemplate">loading...</span>
  <ng-template [ngTemplateOutlet]="loadingTemplate"></ng-template>`,
})
export class LoadingComponent {
  @Input() loadingTemplate: TemplateRef<any>;
}
