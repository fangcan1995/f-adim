import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {Result} from "../../../model/result.class";
import {Router} from "@angular/router";
import {ORDER_STATE} from "../../../const";
import {taskScategory} from "../../taskscategory";
import * as _ from 'lodash';
@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class TodoComponent implements OnInit {
  tasks = [];
  titles = [
    {key:'taskInfo',label:'任务',type:'html'},
    {key:'time', label:'任务发布时间'},
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":10,
    "query":{
      "status":""
    }
  }; //分页及排序
  isChecked=[true,false,false,false,false,false,false];
  taskTypes=taskScategory;  //单选框列表
  currentType=0;  //当前选中类型
  constructor(private service: WorkspaceService, private router:Router) {
  }
  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.service.getTasks(this.pageInfo).then((res) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.tasks = res.data.list;         //记录列表
      //重写数据
      console.log(this.tasks);
      this.tasks = _.map(this.tasks, r => {
        let taskInfo;
        let tasktype;
        tasktype=_.find(this.taskTypes,x => x.code === r.projectStatus)||{"editPageUrl":"","code":"10000","taskName":"错误"};
        taskInfo=`<a href="${tasktype.editPageUrl}${r.id}" target="_blank"><span class="label label-${tasktype.code}" >${tasktype.taskName}</span> ${r.projectName} 来自 ${r.memberName} 的任务</a>`;
        return _.set(r, 'taskInfo', taskInfo);
      });
      //console.log(this.tasks);
    }).catch(err=>{
      console.log(err);
    });
  }//获取数据

  ckboxToggle(taskType:any,index){
    if(this.currentType!=index){
      this.isChecked=[false,false,false,false,false,false,false];
      this.isChecked[index]=true;
      this.currentType=index;
      this.pageInfo.query.status=taskType.code;
      this.getList()
    }

  }//切换状态
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }//分页

}
