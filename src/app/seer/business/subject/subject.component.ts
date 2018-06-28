import { Component } from '@angular/core';
import * as _ from 'lodash';
import {CommonService} from "../common/common.service";
import {SubjectService} from "./subject.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {PREVIEW,ABORTIVE} from "../../common/seer-table/seer-table.actions";
import {isUndefined} from "util";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})

export class SubjectComponent {

  hasGlobalFilter = true;
  isLoading: boolean = true;

  //过滤器
  filters = [
 /*   {
      key: 'trueName', label: '用户姓名', type: 'input.text'
    },
    {
      key: 'phoneNumber', label: '手机号', type: 'input.text'
    },*/
    {
      key: 'loanType', label: '借款类型', type: 'select', isDict: true, category: 'LOAN_TYPE'
    },
    {
      key: 'loanExpiry', label: '借款期限', type: 'select', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key: 'projectStatus', label: '项目状态', type: 'select', isDict: true, category: 'PROJECT_STATUS'
    },
    {
      key: 'putTime',
      label: '发布时间',
      groups: [
        {
          type: 'datepicker',
        },
        {
          type: 'datepicker',
        },
      ],
      groupSpaces: ['至']
    },
  ];

  //表格标题
  titles = [
    {
      key:'projectNum', label:'项目编号'
    },
    {
      key:'trueName', label:'用户姓名',
    },
    {
      key:'phoneNumber', label:'手机号'
    },
    {
      key:'loanType', label:'借款类型', isDict: true, category: 'LOAN_TYPE'
    },
    {
      key:'projectAmt', label:'借款金额（元）'
    },
    {
      key:'loanExpiry', label:'借款期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'putTime', label:'发布时间'
    },
    {
      key:'projectStatus', label:'项目状态', isDict: true, category: 'PROJECT_STATUS'
    },
  ];

  //查询参数，分页、排序、检索
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "-projectNum",
    "total": "",
    "globalSearch": "",
    "trueName": "",
    "phoneNumber": "",
    "loanType": "",
    "loanExpiry": "",
    "projectStatus": "",
    "startPutTime": "",
    "endPutTime": "",
  };

  source = [];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private service: SubjectService,
    private commonService: CommonService,
    private _messageService: SeerMessageService,) {}

  ngOnInit() {

    this.getList();

  }

  //初始化数据
  getList(): void{
    this.isLoading = true;
    this.service.getList(this.pageInfo).then((res: any) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, i => {
        return _.set(i, 'actions', [PREVIEW,ABORTIVE]);
      });
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '获取标的信息失败' );
    });
  }

  //分页查询
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getList();
  }

  //全局检索
  handleFiltersChanged($event) {
    let params = $event;
    let { putTime, ...otherParams } = params;
    let startPutTime,
      endPutTime;
    if(_.isArray(putTime)) {
      startPutTime = putTime[0] ? (formatDate(putTime[0], 'YYYY-MM-DD 00:00:00')) : "";
      endPutTime = putTime[1] ? (formatDate(putTime[1], 'YYYY-MM-DD 23:59:59')) : "";
    }
    //this.pageInfo = Object.assign({}, this.pageInfo, params);

    params = {
      ...otherParams,
      startPutTime,
      endPutTime,
    }
    this.pageInfo = {
      ...this.pageInfo,
      ...params
    };
    //console.log('页面信息');
    //console.log(this.pageInfo);
    this.getList();
  }

  //操作
  onChange($event) {
    let url = `/business/forms/`;
    switch ($event.type) {
      case 'preview': this._router.navigate([url + 'project-view', $event.data.projectId,'preview'], {relativeTo: this.route}); break;
      case 'abortive': this._router.navigate([url + 'project-view', $event.data.projectId,'abortive'], {relativeTo: this.route}); break;
    }
  }

  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}

