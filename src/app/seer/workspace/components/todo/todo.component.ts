import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {ActivatedRoute, Router} from "@angular/router";
import {taskScategory} from "../../taskscategory";
import {SeerMessageService} from "../../../../theme/services/seer-message.service"
import * as _ from 'lodash';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class TodoComponent implements OnInit {
  tasks = []; //任务列表
  titles = [
    {key: 'taskInfo', label: '任务', type: 'html'},
    {key: 'time', label: '任务发布时间', type: 'date-time'},
  ]; //任务表表头
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "",
    "total": 10,
    "status": ""
  }; //分页及排序
  isChecked = [true, false, false, false, false, false, false]; //单选按钮默认选中状态
  taskTypes = _.cloneDeep(taskScategory);  //所有任务类型
  currentType = 0;  //当前选中类型
  constructor(private service: WorkspaceService,
              private _router: Router,
              private route: ActivatedRoute,
              private _messageService: SeerMessageService) {
  }

  ngOnInit(): void {
    //获取各类任务的数量
    this.service.getCounts().then(res=>{
      let totals=0;
      this.taskTypes.map(r => {
        if(res.data[r.code]){
          r.total=res.data[r.code];
          totals=totals+r.total;
        }
      });
      this.taskTypes[0].total=totals; //全部任务数
    }).catch(err=>{
      this.showError(err.msg || '获取任务数量失败');
    });
    this.getList();
  }

  //获取列表
  getList() {
    this.service.getTasks(this.pageInfo).then((res) => {
      this.pageInfo.pageNum = res.data.pageNum;  //当前页
      this.pageInfo.pageSize = res.data.pageSize; //每页记录数
      this.pageInfo.total = res.data.total; //记录总数
      this.tasks = res.data.list;         //记录列表
      //拼装数据
      this.tasks = _.map(this.tasks, r => {
        let tasktype = _.find(this.taskTypes, x => x.code === r.projectStatus) || {
          "code": "test",
          "taskName": "test"
        };
        return _.set(r, 'taskType',`${tasktype.taskName}` );
      });
    }).catch(err => {
      this.showError(err.msg || '待办任务获取失败');
    });
  }

  //模拟checkbox切换状态
  ckboxToggle(taskType: any, index) {
    if (this.currentType != index) {
      this.isChecked = [false, false, false, false, false, false, false];
      this.isChecked[index] = true;
      this.currentType = index;
      this.pageInfo.status = taskType.code;
      this.getList()
    }

  }

  //换页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getList();
  }

  //成功提示
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  //错误提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }

  //页面跳转
  public loadForm(formType, id) {
    let url = `/business/forms/`;
    switch (formType) {
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

    }
  }

}
