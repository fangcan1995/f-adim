import {Component, Input, OnChanges, SimpleChanges, OnInit} from "@angular/core";
import {BaseService} from "../../../../../base.service";
import {ProcessNodeConfig, ProcessNodeConfigDTO} from "../../../../../model/workflow/process-node-config";
import {SERVER} from "../../../../../const";
import {Role} from "../../../../../model/auth/role";
import * as _ from 'lodash';
@Component({
  selector: 'workflow-manage-edit',
  template: `
<seer-card [title]="title">
  <div class="row">
    <button class="btn btn-default" (click)="ngOnChanges(undefined)">取消</button>
    <button class="btn btn-info" (click)="saveConfig()">保存</button>
    <button class="btn btn-info pull-right" (click)="newConfig()">新增</button>
  </div>
  <div class="row" style="margin-top:15px;">
    <table class="table table-bordered table-hover">
      <tr style="background: rgba(233, 233, 233, 0.4)">
        <th style="text-align: center;">
          节点顺序
        </th>
        <th style="text-align: center;">
          节点名称
        </th>
        <th style="text-align: center;">
          角色
        </th>
        <th style="text-align: center;">
          操作
        </th>
      </tr>
      <tr *ngFor="let item of processNodeConfigList">
        <td style="text-align: center;padding: 1px;"><input [(ngModel)]="item.nodeSort" style=" width: 100%;" type="number" min="0" required placeholder="节点顺序" (change)="resetSort()"/></td>
        <td style="text-align: center;padding: 1px;"><input style=" width: 100%;" [(ngModel)]="item.nodeName" type="text" required placeholder="节点名称"/></td>
        <td style="text-align: center;padding: 1px;"><button *ngIf="totalRoleList" type="button" class="btn btn-info" checkbox-picker (notify)="onPickerNotify($event, item)" [data]="getRoleListByItem(item)" [size]="'sm'" [title]="'选择角色'" [labelField]="'roleName'" [showFilter]="true" [pageSize]="5">选择角色</button></td>
        <td style="text-align: center;padding: 1px;"><button class="btn btn-danger" (click)="deleteConfig(item)">删除</button></td>
      </tr>
    </table>
  </div>
</seer-card>
`,
})
export class WorkflowManageEditComponent implements OnChanges,OnInit {
  ngOnInit(): void {
    const url = `${SERVER}/sys/role?excludeInvalidRoles=true`;
    this.service.getAll(url).then(result => {
      if (result.success) {
        this.totalRoleList = result.data;
      } else {
        alert(result.message)
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = this.processName?this.processName:'请选择' + '流程';
    if (this.processKey) {
      const url = `${SERVER}/workflow/basic/process/config/${this.processKey}`;
      this.service.getAll(url).then(result => {
        if (result.success) {
          this.processNodeConfigList = result.data;
        } else {
          alert(result.message)
        }
      })
    }
  }

  @Input() processKey;
  @Input() processName;
  title = '';

  constructor(private service: BaseService<any>) {
  }

  processNodeConfigList: ProcessNodeConfig[] = [];
  totalRoleList: Role[] = [];
  roleListTitle = [
    {key:'roleName',label:'角色'}
  ];

  getRoleListByItem(item){
    //需要每次都克隆新的，否则会有不能取消选中角色的bug
    let roleListByItem = _.cloneDeep(this.totalRoleList);
    roleListByItem.forEach((role:Role)=>{
      if (item.nodeRoles.indexOf(role.roleId)>-1){
        role['isChecked'] = true;
      }
    });
    return roleListByItem;
  }

  deleteConfig(item){
    _.remove(this.processNodeConfigList, item);
    this.resetSort();
  }

  resetSort(){
    this.processNodeConfigList = this.processNodeConfigList.sort((a,b)=>+a.nodeSort-+b.nodeSort);
    this.processNodeConfigList.forEach((item,index,array)=>{
      item.nodeSort = index+1+'';
    })
  }

  onPickerNotify($event, item){
    if($event.type=='select'){
      item.nodeRoles = [];
      for(let i = 0; i<$event.data.length; i++){
        item.nodeRoles.push($event.data[i].roleId);
      }
    }
    if($event.type=='clear_all'){
      item.nodeRoles = [];
    }
  }
  newConfig(){
    let config = new ProcessNodeConfig();
    config.processKey = this.processKey;
    config.nodeRoles = [];
    config.nodeSort = this.processNodeConfigList.length+1+'';
    config.id = new Date().getTime()+'';
    config.isDelete = '00';
    config.createUser = this.service.getCurrentUser().userId;
    config.operator = this.service.getCurrentUser().userId;
    this.processNodeConfigList.push(config)
  }

  saveConfig(){
    let dto = new ProcessNodeConfigDTO();
    dto.processKey = this.processKey;
    for(let i = 0; i<this.processNodeConfigList.length;i++){
      let node = this.processNodeConfigList[i];
      if (!node.nodeRoles||node.nodeRoles.length==0){
        alert('节点：'+node.nodeSort+' '+node.nodeName+' 请至少选择一个角色');
        return;
      }
    }
    dto.configList = this.processNodeConfigList;
    const url = `${SERVER}/workflow/basic/process/config`;
    this.service.create(url,dto).then(result=>{
      if(result.success){
        alert('保存成功');
      }else {
        this.ngOnChanges(undefined);
        alert(result.message);
      }
    })
  }
}
