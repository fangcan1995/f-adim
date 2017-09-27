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
  /*getLabelName(task:any){
    switch (task.category){
      case '01':
        return '资料补全';
      case '02':
        return '初审';
      case '03':
        return '复审';
      case '04':
        return '标的发布';
      case '05':
        return '流标';
      case '06':
        return '满标审核';
      case '07':
        return '提前还款审核';
    }
    return '';
  }*/

  /*getLabelColor(task:any){
    switch (task.category){
      case '01':
      case '02':
      case '03':
        return 'label-blue';
      case '04':
      case '05':
        return 'label-gold';
      case '06':
        return 'label-pink';
      case '07':
        return 'label-green';
    }
    return '';
  }*/



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
  /*directToTaskHandlePage(task){

    let censorPageUrl;
    let detailPageUrl;
    switch (task.category){
      case '00':
        //censorPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/censor/';
        //detailPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/order-detail/';
        break;
      case '01':
        //censorPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/censor/';
        //detailPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/order-detail/';
        break;
      case '02':
        break;
      case '03':
        break;
      case '04':
        censorPageUrl = '/business/intention';
        detailPageUrl = '/system/resource-manage/edit/';
        //detailPageUrl = '/inventory/purchase-manage/refund-purchase-order-manage/order-detail/';
        break;
      case '05':
        break;
      case '06':
        break;
      case '07':
        break;
    }
    this.router.navigate([detailPageUrl,task.id]);
    //alert(task.description);
    /!*this.service.getOrderCensorHistory(task.description).then(result=>{
      if (result.success){
        if(result.data.length==0){
          this.router.navigate([censorPageUrl, task.description, task.id]);
        }else {
          let processApproval = result.data[result.data.length-1];
          switch (processApproval.orderState){
            case ORDER_STATE.VOTING:
            case ORDER_STATE.BEGIN_PROCESS:
              this.router.navigate([censorPageUrl, task.description, task.id]);
              break;
            case ORDER_STATE.VOTE_PASS:
            case ORDER_STATE.VOTE_FAIL:
              this.router.navigate([detailPageUrl, task.description, task.id]);
              break;
            case ORDER_STATE.ABANDONED:
              this.router.navigate([detailPageUrl, task.description]);
              break;
            case ORDER_STATE.RESUBMIT:
              this.router.navigate([censorPageUrl, task.description, task.id]);
              break;
            case ORDER_STATE.CONFIRMED:
              this.router.navigate([detailPageUrl, task.description]);
              break;
          }
        }
      }else {
        alert(result.message);
      }
    })*!/
  }*/
}
