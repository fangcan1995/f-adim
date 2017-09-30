import { Component, OnInit } from "@angular/core";
import {WorkspaceService} from "../../workspace.service";
import {Result} from "../../../model/result.class";
import {Router} from "@angular/router";
import {ORDER_STATE} from "../../../const";
@Component({
  selector: 'others',
  templateUrl: './others.component.html',
  styleUrls: [ '../../workspace.component.scss' ],
})
export class OthersComponent implements OnInit {
  constructor(private service: WorkspaceService, private router:Router) {
  }

  ngOnInit(): void {
    let todoPromise = this.service.getTasks();
    if (todoPromise) {
      todoPromise.then((result: Result) => {
        if (result.success) {
          this.originalTasks = result.data;
          if(this.originalTasks.length>1){
            //倒序排序
            this.originalTasks = this.originalTasks.sort((a,b)=>a.createTime>b.createTime?-1:1)
          }
          this.tasks = result.data;
        } else {
          alert(result.message);
        }
      })
    }
  }

  getLabelName(task:any){
    switch (task.category){
      case '00':
        return '借款申请';
      case '01':
        return '满标划转';
      case '02':
        return '提前退出';
      case '03':
        return '提前还款';
      case '04':
        return 'aaaaaa';
      case '05':
        return '满标审核';
      case '06':
        return 'bbbbbb';
      case '07':
        return 'cccc';
    }
    return '';
  }

  getLabelColor(task:any){
    switch (task.category){
      case '00':
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
  }

  originalTasks = [];
  tasks = [];

  all = 0xf;
  selectedTaskCategories: number = this.all;

  taskType = {
    ORDER: {code:0x1, categories:['00','01','02','03']},
    STORAGE: {code:0x2, categories:['04','05']},
    PAYMENT: {code:0x4, categories:['06']},
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

  directToTaskHandlePage(task){
    let censorPageUrl;
    let detailPageUrl;
    switch (task.category){
      case '00':
        censorPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/censor/';
        detailPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/order-detail/';
        break;
      case '01':
        censorPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/censor/';
        detailPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/order-detail/';
        break;
      case '02':
        break;
      case '03':
        break;
      case '04':
        break;
      case '05':
        break;
      case '06':
        break;
      case '07':
        break;
    }

    this.service.getOrderCensorHistory(task.description).then(result=>{
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
    })
  }
}
