import {Component} from "@angular/core";
@Component({
  selector: 'workflow-manage-home',
  template: `
<div class="row">
  <div class="col-sm-4">
    <div style="margin-right: 15px">
      <workflow-manage-list (select)="onSelect($event)"></workflow-manage-list>
    </div>
  </div>
  <div class="col-sm-8">
    <div style="margin-left: 15px">
      <workflow-manage-edit [processKey]="processKey" [processName]="processName"></workflow-manage-edit>
    </div>
  </div>
</div>

`,
})
export class WorkflowManageHomeComponent{
  processKey;
  processName;
  onSelect($event){
    this.processKey = $event.id;
    this.processName = $event.name;
  }
}
