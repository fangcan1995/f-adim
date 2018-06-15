import { Component } from '@angular/core';
import * as _ from 'lodash';

import {CommonService} from "../common/common.service";
import {TransferService} from "./transfer.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {ActivatedRoute, Router} from "@angular/router";

import {isUndefined} from "util";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import {PREVIEW,ABORTIVE} from "../../common/seer-table/seer-table.actions";



@Component({
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})

export class TransferComponent {

  hasGlobalFilter = true;
  isLoading: boolean = true;

  //过滤器
  filters = [
    {
      key: 'trueName', label: '用户姓名', type: 'input.text'
    },
    {
      key: 'phoneNumber', label: '手机号码', type: 'input.text'
    },
    {
      key: 'transAmt', label: '投资金额',  type: 'input.text'
    },
/*    {
      key: 'projectType', label: '项目类型',  type: 'select', isDict: true, category: 'PROJECT_TYPE'
    },*/
    {
      key: 'transferPeriod', label: '投资期限', type: 'select', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key: 'transStatus', label: '项目状态', type: 'select', isDict: true, category: 'TRANSFER_PROJECT_STATUS'
    },
    {
      key: 'applyTime',
      label: '申请时间',
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
      key:'transNo', label:'项目编号'
    },
    {
      key:'trueName', label:'用户姓名',
    },
    {
      key:'phoneNumber', label:'手机号'
    },
    {
      key:'transAmt', label:'投资金额（元）'
    },
    {
      key:'transferPeriod', label:'投资期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'transferDate', label:'满标划转时间'
    },
    {
      key:'applyTime', label:'申请时间'
    },
    {
      key:'transStatus', label:'项目状态', isDict: true, category: 'TRANSFER_PROJECT_STATUS'
    },
  ];

  //查询参数，分页、排序、检索
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "-applyTime",
    "total": "",
    "globalSearch": "",
    "trueName": "",
    "phoneNumber": "",
    "loanExpiry": "",
    "transferStatus": "",
    "applyTimeStart": "",
    "applyTimeEnd": "",
  };

  source = [];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private service: TransferService,
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
      console.log(this.source);
      this.source = _.map(this.source, i => {
        let transStatus = i.transStatus;
        let actions;
        switch (transStatus) {
          case 2:
            actions = [PREVIEW,ABORTIVE];   //流标
            break;

          default:
            actions =[PREVIEW];
            break;
        }
        this.isLoading = false;
        return _.set(i, 'actions', actions)


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
    let params=$event;
    let { applyTime, ...otherParams } = params;
    let applyTimeStart,
      applyTimeEnd;
    if ( _.isArray(applyTime)) {
      applyTimeStart = applyTime[0] ? (formatDate(applyTime[0],'YYYY-MM-DD 00:00:00')) : '';
      applyTimeEnd = applyTime[1] ? (formatDate(applyTime[1],'YYYY-MM-DD 23:59:59')) : '';
    }
    params = {
      ...otherParams,
      applyTimeStart,
      applyTimeEnd,
    }
    this.pageInfo = {
      ...this.pageInfo,
      ...params
    };

    this.getList();

  }

  //操作
  onChange($event) {
    let url = `/business/forms/`;
    switch ($event.type) {
      case 'preview': this._router.navigate([url + 'transfer-view', $event.data.id], {relativeTo: this.route}); break;
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

