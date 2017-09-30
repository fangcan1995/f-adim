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
  originalTasks = [];
  data = [];
  titles = [
    {key:'category', label:'任务类型'},
    {key:'name', label:'任务内容',isDict:true},
    {key:'createTime', label:'任务发布时间'},

  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"menuPid,sortNum",
    "total":10,
    "query":{
      "category":""
    }
  }; //分页及排序
  isChecked={
    "all":true,
    "first":false,
    "second":false,
    "third":false,
    "forth":false,
    "fifth":false,
    "sixth":false,
    "seventh":false
  };
  taskTypes=taskScategory;  //单选框列表
  currentType="all";  //当前选中类型
  constructor(private service: WorkspaceService, private router:Router) {
  }
  ngOnInit(): void {
    this.getList();
  }
  getList(){
    let data_temp={
      "pageNum": 1,
      "pageSize": 10,
      "total": 12,
      "list": [
        {
          "id": 1,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 2,
          "category": "02",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 3,
          "category": "03",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 4,
          "category": "04",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 5,
          "category": "05",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 6,
          "category": "06",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 7,
          "category": "07",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 8,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 9,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 10,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 11,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        },
        {
          "id": 12,
          "category": "01",
          "createTime": "2017-03-31 11:53:39",
          "description": "8af57377-5549-4c90-a0a4-ca1621553686",
          "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
        }
      ]}
    this.pageInfo.pageNum=data_temp.pageNum;  //当前页
    this.pageInfo.pageSize=data_temp.pageSize; //每页记录数
    this.pageInfo.total=data_temp.total; //记录总数
    this.data = data_temp.list;         //记录列表
    //this.originalTasks = data_temp.list;
    /*this.service.getTasks(this.pageInfo).then((data) => {
      data={
          "pageNum": 1,
          "pageSize": 10,
          "total": 12,
          "list": [
            {
              "id": 1,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 2,
              "category": "02",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 3,
              "category": "03",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 4,
              "category": "04",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 5,
              "category": "05",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 6,
              "category": "06",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 7,
              "category": "07",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 8,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 9,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 10,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 11,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            },
            {
              "id": 12,
              "category": "01",
              "createTime": "2017-03-31 11:53:39",
              "description": "8af57377-5549-4c90-a0a4-ca1621553686",
              "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
            }
          ]}
      this.pageInfo.pageNum=data.pageNum;  //当前页
      this.pageInfo.pageSize=data.pageSize; //每页记录数
      this.pageInfo.total=data.total; //记录总数
      this.data = data.list;         //记录列表
    });*/
  }//获取数据
  getTasksCategory(category:any){
    let data =_.find(this.taskTypes, x => x.category === category);
    return data;
  }
  getCategoryCount(category){
    //console.log(category);
    let count = 0;
    this.originalTasks.map(task => {
       count += category.indexOf(task.category)>=0?1:0;
    });
    return count;
  }//获取任务数量
  ckboxToggle(category:any){
    if(this.currentType!=category){
      for ( var i in this.isChecked) {
        this.isChecked[i]=false;
      }
      if(category=="all"){
        this.currentType='all';
        this.isChecked['all']=true;
        this.pageInfo.query.category="";
      }else{
        this.currentType=category;
        this.isChecked[category]=true;
        this.pageInfo.query.category=category;
      }
      this.getList();
    }
  }//选框点击
  directToTaskHandlePage(url:any,id:any){
    this.router.navigate([url,id]);
  }//？？
  onPageChange($event) {
    this.pageInfo.pageSize = $event.rowsOnPage;
    this.pageInfo.pageNum=$event.pageNumber;
    this.getList();
  }//分页
}
