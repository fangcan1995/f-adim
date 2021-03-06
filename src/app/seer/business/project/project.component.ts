import { Component } from '@angular/core';
import * as _ from 'lodash';

import {CommonService} from "../common/common.service";
import {ProjectService} from "./project.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PREVIEW} from "../../common/seer-table/seer-table.actions";
import {isUndefined} from "util";
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})

export class ProjectComponent {

  hasGlobalFilter = true;
  isLoading: boolean = true;

  //过滤器
  filters = [
    {
      key: 'trueName', label: '用户姓名', type: 'input.text'
    },
    {
      key: 'phoneNumber', label: '手机号', type: 'input.text'
    },
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
      key: 'transferTime',
      label: '满标划转时间',
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
      key:'loanExpiry', label:'借款期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'projectAmt', label:'借款金额（元）'
    },
    {
      key:'projectCurrentAmt', label:'已筹金额（元）'
    },

    {
      key:'transferTime', label:'满标划转时间'
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
    "startTransferTime": "",
    "endTransferTime": "",
  };

  source = [];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private service: ProjectService,
    private commonService: CommonService,
    private _messageService: SeerMessageService,) {}

  ngOnInit() {

    this.getList();

  }

  //初始化数据
  getList(): void{
    this.isLoading = true;
    this.service.getList(this.pageInfo).then((res: any) => {
      console.log(res.data);
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, i => {
        return _.set(i, 'actions', [PREVIEW]);
      });
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '查询失败' );
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
    if(!isUndefined(params.transferTime[0])) {
      this.pageInfo.startTransferTime = params.transferTime[0] ? (formatDate(params.transferTime[0], 'YYYY-MM-DD 00:00:00')) : "";
    }
    if(!isUndefined(params.transferTime[1])) {
      this.pageInfo.endTransferTime = params.transferTime[1] ? (formatDate(params.transferTime[1], 'YYYY-MM-DD 00:00:00')) : "";
    }
    this.pageInfo = Object.assign({}, this.pageInfo, params);
    this.getList();
  }

  //操作
  onChange($event) {
    let url = `/business/forms/`;
    switch ($event.type) {
      case 'preview': this._router.navigate([url + 'project-view', $event.data.projectId,'preview'], {relativeTo: this.route}); break;
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

