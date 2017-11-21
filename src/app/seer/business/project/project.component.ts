import { Component } from '@angular/core';
import * as _ from 'lodash';

import {CommonService} from "../common/common.service";
import {ProjectService} from "./project.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})

export class ProjectComponent {

  hasGlobalFilter = true;

  //过滤器
  filters = [
    {
      key: 'userName', label: '用户姓名', type: 'input.text'
    },
    {
      key: 'phoneNumber', label: '手机号', type: 'input.text'
    },
    {
      key: 'loanApplyType', label: '借款类型', type: 'select', isDict: true, category: 'LOAN_APPLY_TYPE'
    },
    {
      key: 'loanApplyExpiry', label: '借款期限', type: 'select', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key: 'applyStatus', label: '项目状态', type: 'select', isDict: true, category: 'PROJECT_STATUS'
    },
    {
      key: 'applyTimeStart', label: '申请时间', type: 'input.text'
    },
    {
      key: 'applyTimeEnd', label: '至', type: 'input.text'
    },
  ];

  //表格标题
  titles = [
    {
      key:'projectCode', label:'项目编号'
    },
    {
      key:'userName', label:'用户名',
    },
    {
      key:'phoneNumber', label:'手机号'
    },
    {
      key:'loanApplyType', label:'借款类型', isDict: true, category: 'LOAN_APPLY_TYPE'
    },
    {
      key:'applyAmt', label:'借款金额'
    },
    {
      key:'loanApplyExpiry', label:'借款期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'fullAuditTime', label:'满标审核时间'
    },
    {
      key:'projectStatus', label:'项目状态', isDict: true, category: 'PROJECT_STATUS'
    },
  ];

  //查询参数，分页、排序、检索
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "-createTime",
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
    private service: ProjectService,
    private commonService: CommonService,
    private _messageService: SeerMessageService,) {}

  ngOnInit() {

    this.getList();

  }

  //初始化数据
  getList(): void{
    this.service.getList(this.pageInfo).then((res: any) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, i => {
        return _.set(i, 'actions', this.commonService.setAction(i.projectStatus));
      });
    }).catch(err => {
      this.showError( err.msg || '获取贷款信息失败' );
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
    this.pageInfo = Object.assign({}, this.pageInfo, params);
    this.getList();
  }

  //操作
  onChange($event) {
    this.commonService.loadForm($event.type, $event.data.id);
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

