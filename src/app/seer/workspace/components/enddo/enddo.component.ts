import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {Result} from "../../../model/result.class";
import {Router} from "@angular/router";
import {ORDER_STATE} from "../../../const";
import {taskScategory} from "../../taskscategory";
import * as _ from 'lodash';
@Component({
  selector: 'enddo',
  templateUrl: './enddo.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class EnddoComponent implements OnInit {
  originalTasks = [];
  tasks = [];
  taskscategory=taskScategory;
  constructor(private service: WorkspaceService, private router:Router) {
  }

  ngOnInit(): void {
    let todoPromise = this.service.getTasks();
    if (todoPromise) {
      todoPromise.then((result: Result) => {
        if (result.success) {
          result.data={
            "pageNum": 1,
            "pageSize": 10,
            "total": 13,
            "list": [
              {
                "id": 1,
                "category": "01",
                "createTime": "2017-03-31 11:53:39",
                "description": "8af57377-5549-4c90-a0a4-ca1621553686",
                "name": "汇车贷-HCD201707190001 来自 XXXX 的申请 ",
              }
            ],
          };

          this.originalTasks = result.data.list;
          console.log(result.data);
          if(this.originalTasks.length>1){
            //倒序排序
            this.originalTasks = this.originalTasks.sort((a,b)=>a.createTime>b.createTime?-1:1)
          }
          this.tasks = result.data.list;
        } else {
          alert(result.message);
        }
      })
    }
  }
  getTasksCategory(category:any){
    let data =_.find(this.taskscategory, x => x.category === category);
    return data;
  }




  all = 0xf;
  selectedTaskCategories: number = this.all;

  taskType = {
    ORDER: {code:0x1, categories:['01','02','03']},
    STORAGE: {code:0x2, categories:['04','05','06']},
    ACTIVITY: {code:0x8, categories:['07']},
  };

  toggleCategory(category) {
    this.selectedTaskCategories = this.selectedTaskCategories ^ category.code;
    this.toggleItems();
  }

  getCategoryCount(category){
    let count = 0;
    this.originalTasks.map(task => {
      count += category.categories.indexOf(task.category)>=0?1:0;
    });
    return count;
  }

  toggleItems() {
    let tempList = [];
    for (let k in this.taskType) {
      if (this.taskType[k].code == (this.selectedTaskCategories & this.taskType[k].code)) {
        tempList.push(...this.originalTasks.filter(task => {
          return this.taskType[k].categories.indexOf(task.category)>=0;
        }))
      }
    }
    this.tasks = tempList.sort((a, b) => a.timestamp - b.timestamp);
  }

  reset() {
    this.selectedTaskCategories = this.selectedTaskCategories != this.all ? this.all : 0;
    this.toggleItems();
  }

  isChecked(category) {
    return category.code == (this.selectedTaskCategories & category.code);
  }
  directToTaskHandlePage(url:any,id:any){
    this.router.navigate([url,id]);
  }

}
