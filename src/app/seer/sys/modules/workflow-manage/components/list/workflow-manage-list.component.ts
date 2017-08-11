import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {BaseService} from "../../../../../base.service";
import {SERVER} from "../../../../../const";
@Component({
  selector: 'workflow-manage-list',
  template: `
<seer-card [title]="'工作流'" [bigPadding]="false">
  <table class="table table-bordered table-hover">
    <tr style="background: rgba(233, 233, 233, 0.4)">
      <th style="text-align: center;">
        流程名称
      </th>
      <th style="text-align: center;">
        操作
      </th>
    </tr>
    <tr *ngFor="let item of processList">
      <td>{{item.name}}</td>
      <td style="text-align: center;"><button class="btn btn-info" (click)="onSelect(item)">配置</button></td>
    </tr>
  </table>
</seer-card>
`,
})
export class WorkflowManageListComponent implements OnInit{

  constructor(private service: BaseService<any>) {
  }

  processList = [];
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    const url = `${SERVER}/workflow/basic/process`;
    this.service.getAll(url).then(result=>{
      if (result.success){
        this.processList = result.data;
        this.select.emit(this.processList[0])
      }else {
        alert(result.message)
      }
    })
  }

  onSelect(item){
    this.select.emit(item)
  }

}
