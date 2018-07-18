import { Component } from '@angular/core';
import * as _ from 'lodash';
import { IntentionService } from "./intention.service";
import {CommonService} from "../common/common.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PREVIEW} from "../../common/seer-table/seer-table.actions";
import {isUndefined} from "util";
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  templateUrl: './intention.component.html',
  styleUrls: ['./intention.component.scss'],
})

export class IntentionComponent {

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
      key: 'applyStatus', label: '申请状态', type: 'select', isDict: true, category: 'APPLY_STATUS'
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
      key:'applyNum', label:'申请编号'
    },
    {
      key:'trueName', label:'姓名',
    },
    {
      key:'phoneNumber', label:'手机号'
    },
    {
      key:'loanType', label:'借款类型', isDict: true, category: 'LOAN_TYPE'
    },
    {
      key:'applyAmt', label:'借款金额（元）'
    },
    {
      key:'loanExpiry', label:'借款期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'applyDate', label:'申请时间'
    },
    {
      key:'applyStatus', label:'申请状态', isDict: true, category: 'APPLY_STATUS'
    },
  ];

  //查询参数，分页、排序、检索
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    //"sortBy": "-applyNum",
    "sortBy": "applyStatus,-applyNum",
    "total": "",
    "globalSearch": "",
    "userName": "",
    "phoneNumber": "",
    "loanApplyType": "",
    "loanApplyExpiry": "",
    "applyStatus": "",
    "applyTimeStart": "",
    "applyTimeEnd": "",
  };

  source = [];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private service: IntentionService,
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
    if(!isUndefined(params.applyTime[0])) {
      this.pageInfo.applyTimeStart = params.applyTime[0] ? (formatDate(params.applyTime[0], 'YYYY-MM-DD 00:00:00')) : "";
    }
    if(!isUndefined(params.applyTime[1])) {
      this.pageInfo.applyTimeEnd = params.applyTime[1] ? (formatDate(params.applyTime[1], 'YYYY-MM-DD 00:00:00')) : "";
    }
    this.pageInfo = Object.assign({}, this.pageInfo, params);
    this.getList();
  }

  //操作
  onChange($event) {
    let url = `/business/forms/`;
    switch ($event.type) {
      case 'create':
        this._router.navigate([url + 'loan-apply'], {relativeTo: this.route});
        break;
      case 'preview':
        //this._router.navigate([url + 'loan-view', $event.data.loanApplyId],{relativeTo: this.route});
        this._router.navigate([url + 'project-view', $event.data.loanApplyId,'loan_preview'],{relativeTo: this.route});
        break;
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

