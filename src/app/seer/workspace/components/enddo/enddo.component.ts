import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {Result} from "../../../model/result.class";
import {Router} from "@angular/router";
import {ORDER_STATE} from "../../../const";
import {taskScategory} from "../../taskscategory";
import {SeerMessageService} from "../../../../theme/services/seer-message.service"
import * as _ from 'lodash';
@Component({
  selector: 'enddo',
  templateUrl: './enddo.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class EnddoComponent implements OnInit {
  tasks = []; //任务列表
  titles = [
    {key:'taskInfo',label:'任务',type:'html'},
    {key:'time', label:'任务发布时间'},
  ]; //任务表表头
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":10,
    "status":""
  }; //分页及排序
  isChecked=[true,false,false,false,false,false,false]; //单选按钮默认选中状态
  taskTypes=taskScategory;  //所有任务类型
  currentType=0;  //当前选中类型
  constructor(
    private service: WorkspaceService,
    private router:Router,
    private _messageService: SeerMessageService) {
  }
  ngOnInit(): void {
    this.getList();
  }

  //获取数据
  getList(){
    this.service.getCompleteTasks(this.pageInfo).then((res) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.tasks = res.data.list;         //记录列表
      //拼装数据
      this.tasks = _.map(this.tasks, r => {
        let taskInfo=`<span class="label label-10000" >${r.taskName}</span> ${r.projectName} 来自 ${r.memberName} 的任务`;
        return _.set(r, 'taskInfo', taskInfo);
      });
    }).catch(err=>{
      this.showError(err.msg || '已办任务获取失败');
    });
  }

  //模拟checkbox切换状态
  ckboxToggle(taskType:any,index){
    if(this.currentType!=index){
      this.isChecked=[false,false,false,false,false,false,false];
      this.isChecked[index]=true;
      this.currentType=index;
      this.pageInfo.status=taskType.code;
      this.getList()
    }

  }

  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }

  //错误提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}
