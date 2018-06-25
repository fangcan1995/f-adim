import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {ActivatedRoute, Router} from "@angular/router";
import {processDefinition} from "../../processdefinition";
import {SeerMessageService} from "../../../../theme/services/seer-message.service"
import * as _ from 'lodash';
import {log} from "util";

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class TodoComponent implements OnInit {

  isLoading: boolean = true;

  processDefinition = _.cloneDeep(processDefinition);  //流程定义

  items = []; //全部数据

  tasks = []; //待办任务（过滤）
  /*pageInfo= {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "-createTime",
    "total": ""
  }*/
  constructor(private service: WorkspaceService, private _router: Router, private route: ActivatedRoute, private _messageService: SeerMessageService) {}

  ngOnInit(): void { this.initialize();}

  //初始化数据
  initialize() {
    this.isLoading = true;
    this.service.getTodoTasks().then((res) => {
      this.items = res.data;
      this.tasks = res.data;
      console.log('待办业务列表---------');
      console.log(this.tasks);
      this.classStatistics();
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '待办任务获取失败');
    });
  }

  //分类查看任务
  taskFiler(key: any) {

    //分类切换
    _.each(this.processDefinition, r => {_.set(r, 'isChecked', false);if(r.key == key) {_.set(r, 'isChecked', r.isChecked ? false : true)}});

    //过滤任务
    this.tasks = _.filter(this.items, t => {if (key == 'ALL') return true;return t.processInstance.processDefinitionKey == key});
  }

  //分类统计
  classStatistics() {
    _.each(this.processDefinition, p => {
      _.set(p, 'total', _.filter(this.tasks, t => {
        if ( p.key === 'ALL' ) return true;
        if ( !t.processInstance || !t.processInstance.processDefinitionKey ) return false;
        return t.processInstance.processDefinitionKey === p.key}).length)
    })
  }

  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000})}

  //错误提示
  showError(message: string) {return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000})}



  //页面跳转
  public loadForm(task) {
    console.log(task)
    let url = `/business/forms/`;
    switch (task.processInstance.activityId) {

      //补填资料
      case 'COMPLEMENT':
        this._router.navigate([url + 'loan-complete-audit', task.processInstance.businessKey], {relativeTo: this.route});
        break;

      //初审
      case 'FIRST_AUDIT':
        //this._router.navigate([url + 'loan-first-audit', task.processInstance.businessKey], {relativeTo: this.route});
        this._router.navigate([url + 'project-view', task.processInstance.businessKey,`loan-first-audit`], {relativeTo: this.route});
        break;

      //复审
      case 'SECOND_AUDIT':
        //this._router.navigate([url + 'loan-second-audit', task.processInstance.businessKey], {relativeTo: this.route});
        this._router.navigate([url + 'project-view', task.processInstance.businessKey,`loan-second-audit`], {relativeTo: this.route});
        break;

      //发布
      case 'RELEASE':
        //this._router.navigate([url + 'project-release', task.processInstance.businessKey], {relativeTo: this.route});
        this._router.navigate([url + 'project-view', task.processInstance.businessKey,`project-release`], {relativeTo: this.route});
        break;

      //满标审核
      case 'FULL_AUDIT':
        if(task.processInstance.processDefinitionKey=="INVEST_TRANSFER"){
          //债转标
          this._router.navigate([url + 'transfer-view', task.processInstance.businessKey,`full_audit`], {relativeTo: this.route});
        }else{
          //散标
          this._router.navigate([url + 'project-view', task.processInstance.businessKey,`project-full-audit`], {relativeTo: this.route});
          //this._router.navigate([url + 'project-full-audit', task.processInstance.businessKey], {relativeTo: this.route});
        }


        break;

      //债转审核发布
      case 'TO_BE_AUDIT':
        this._router.navigate([url + 'transfer-view', task.processInstance.businessKey,`be_audit`], {relativeTo: this.route});
        break;

      //提前还款审核
      case 'AHEAD_REPAYMENT_AUDIT':
        this._router.navigate([url + 'project-view', task.processInstance.businessKey,`repayment-audit`], {relativeTo: this.route});
        //this._router.navigate([url + 'repayment-audit', task.processInstance.businessKey], {relativeTo: this.route});
        break;

    }
  }

}
