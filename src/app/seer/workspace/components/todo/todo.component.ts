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

  processDefinition = _.cloneDeep(processDefinition);  //流程定义

  items = []; //全部数据

  tasks = []; //待办任务（过滤）

  constructor(private service: WorkspaceService, private _router: Router, private route: ActivatedRoute, private _messageService: SeerMessageService) {}

  ngOnInit(): void { this.initialize();}

  //初始化数据
  initialize() {
    this.service.getTasks().then((res) => {
      this.items = res.data;
      this.tasks = res.data;
      this.classStatistics();
    }).catch(err => {
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
    let url = `/business/forms/`;

    this._router.navigate([url + 'loan-first-audit', task.processInstance.businessKey], {relativeTo: this.route});


    /*switch (formType) {

      //补填资料
      case '10':
        this._router.navigate([url + 'completion', id], {relativeTo: this.route});
        break;

      //初审
      case '20':
        this._router.navigate([url + 'firstAudit', id], {relativeTo: this.route});
        break;

      //复审
      case '30':
        this._router.navigate([url + 'secondAudit', id], {relativeTo: this.route});
        break;

      //发布
      case '40':
        this._router.navigate([url + 'release', id], {relativeTo: this.route});
        break;

      //满标
      case '60':
        this._router.navigate([url + 'fillAudit', id], {relativeTo: this.route});
        break;

      //提前还款审核
      case '81':
        this._router.navigate([url + 'fillAudit', id], {relativeTo: this.route});
        break;

      //详情
      case 'preview':
        this._router.navigate([url + 'detail', id], {relativeTo: this.route});
        break;

      //测试页面
      case 'test':
        this._router.navigate([url + 'fillAudit', id], {relativeTo: this.route});
        break;
    }*/
  }

}
