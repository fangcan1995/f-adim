import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import { ProjectService } from "./project.service";
@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"fullTime",
    "total":"",
    "query":{
      "globalSearch":"",
      "category":"",
      "categoryName":"",
    },
  }; //分页、排序、检索
  errorMessage;
  hasGlobalFilter = true;
  filters = [
    {
      key: 'realName',
      label: '用户姓名',
      type: 'input.text',
    },
    {
      key: 'tel',
      label: '手机号码',
      type: 'input.text',
    },
    {
      key: 'type',
      label: '借款方式',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '0',
          content: '汇车贷'
        },
        {
          value: '1',
          content: '汇房贷',
        },
        {
          value: '2',
          content: '信用贷',
        },
      ]
    },
    {
      key: 'time',
      label: '借款期限',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '0',
          content: '三个月'
        },
        {
          value: '1',
          content: '六个月',
        },
        {
          value: '2',
          content: '一年',
        },
      ]
    },
    {
      key: 'state',
      label: '项目状态',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '6',
          content: '还款中',
        },
        {
          value: '7',
          content: '待提前还款审核',
        },
        {
          value: '8',
          content: '已结清',
        }
      ]
    },
    {
      key: 'fullTimeStart',
      label: '满标审核时间',
      type: 'input.date',
    },
    {
      key: 'fullTimeEnd',
      label: '-',
      type: 'input.date',
    },
  ];
  title = '意向处理';
  data = [];
  titles = [
    { key:'projectId', label:'项目编号' },
    { key:'realName', label:'用户姓名' },
    { key:'mobilePhone', label:'手机号码' },
    { key:'projectType', label:'项目类型'},
    { key:'loanAmount', label:'借款金额（元）' },
    { key:'lifeOfLoan', label:'借款期限' },
    { key:'fullTime', label:'满标审核时间' },
    { key:'projectStatus', label:'项目状态' },
  ];
  actionSet = {
    'CHECK': {
      'type': 'check',
      'name': '提前还款审核',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'DETAIL':{
      type: 'detail',
      name: '详情',
      className: 'btn btn-xs btn-default',
      icon: 'fa icon-preview'
    }
  }

  constructor(
    private projectService: ProjectService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getList(this.pageInfo);
  }
  getList(params?) {
    this.data = this.projectService.getProjectList(params);
/*    this.data = this.projectService.getProjectList(params).then(
      data => {
        this.pageInfo.pageNum=data.data.pageNum;  //当前页
        this.pageInfo.pageSize=data.data.pageSize; //每页记录数
        this.pageInfo.total=data.data.total; //记录总数
        this.data = data.data.list;

      },
      error =>  this.errorMessage = <any>error);
  };*/
    this.data = _.map(this.data, t => {
      let projectStatus = t.projectStatus;
      let actions;
      switch (projectStatus) {
        case "待提前还款审核":
          actions = [this.actionSet.DETAIL,this.actionSet.CHECK];
          break;
        default:
          actions = [this.actionSet.DETAIL];
          break;
      }
      return _.set(t, 'actions', actions);
    })
  }

  onChange(item) {
    const type = item.type;
    let data = item.data;
    switch (type) {
      case 'check':
        this._router.navigate([`check/${data.projectId}`],{relativeTo: this.route});
        break;
      case 'detail':
        this._router.navigate([`edit/${data.projectId}`], {relativeTo: this.route} );
        //this._router.navigate(['edit', data.projectId],{relativeTo: this.route});
        break;
      default:
        break;
    }
  }
  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }
}

