import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {ActivatedRoute, Router} from "@angular/router";
import {processDefinition} from "../../processdefinition";
import {SeerMessageService} from "../../../../theme/services/seer-message.service"
import * as _ from 'lodash';
import {log} from "util";

@Component({
  selector: 'done',
  templateUrl: './done.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class DoneComponent implements OnInit {

  processDefinition = _.cloneDeep(processDefinition);  //流程定义

  items = []; //全部数据

  tasks = []; //待办任务（过滤）
  //查询参数，分页、排序、检索
  pageInfo = {
    "currentPage": 1,
    "pageSize": 10,
    "total": "",
  };
  constructor(private service: WorkspaceService, private _router: Router, private route: ActivatedRoute, private _messageService: SeerMessageService) {}

  ngOnInit(): void { this.initialize();}

  //初始化数据
  initialize() {
    this.getList();

  }
  getList(){
    console.log('-------this.pageInfo--------');
    console.log(this.pageInfo);
    this.service.getDoneTasks(this.pageInfo).then((res) => {
      console.log('返回的数据');
      console.log(res.data);
      this.pageInfo.currentPage=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.items = res.data.list;
      this.tasks = res.data.list;
      this.classStatistics();

    }).catch(err => {
      this.showError(err.msg || '已办任务获取失败');
    });
  }
  //分类查看任务
  taskFiler(key: any) {

    //分类切换
    _.each(this.processDefinition, r => {_.set(r, 'isChecked', false);if(r.key == key) {_.set(r, 'isChecked', r.isChecked ? false : true)}});

    //过滤任务
    this.tasks = _.filter(this.items, t => {if (key == 'ALL') return true;return t.processDefinitionKey == key});
  }

  //分类统计
  classStatistics() {
    console.log(this.tasks);
    _.each(this.processDefinition, p => {
      _.set(p, 'total', _.filter(this.tasks, t => {
        if ( p.key === 'ALL' ) return true;
        if ( !t || !t.processDefinitionKey ) return false;
        return t.processDefinitionKey === p.key}).length)
    })
  }

  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000})}

  //错误提示
  showError(message: string) {return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000})}
//分页查询
  onPageChange($event) {
    console.log('分页');
    console.log($event);

    this.pageInfo.pageSize = $event.rowsOnPage;
    this.pageInfo.currentPage = $event.pageNumber;
    this.getList();
  }


  //页面跳转
  public loadForm(task) {

    let url = `/business/forms/`;
    switch (task.processDefinitionKey) {

      //借款流程
      case 'LOAN_APPLY':
        //this._router.navigate([url + 'loan-view', task.businessKey], {relativeTo: this.route});
        this._router.navigate([url + 'project-view', task.businessKey,'loan_preview'], {relativeTo: this.route}); //edit by lily
        break;

      //标的流程
      case 'LOAN_PROJECT':
        this._router.navigate([url + 'project-view', task.businessKey,'preview'], {relativeTo: this.route});
        break;

    }
  }

}
