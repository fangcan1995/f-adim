import { Component } from '@angular/core';
import * as _ from 'lodash';

import {CommonService} from "../common/common.service";
import {TransferService} from "./transfer.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {ActivatedRoute, Router} from "@angular/router";

import {isUndefined} from "util";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
/*import {DELETE, PREVIEW, UPDATE} from "../../common/seer-table/seer-table.actions";*/

const PUBLISHED = {
  type: 'preview',
  name: '项目发布',
  className: 'btn btn-xs btn-info',
  icon: 'icon-public',
};
const TRANSFER_CHECK = {
  type: 'preview',
  name: '债权转让审核',
  className: 'btn btn-xs btn-info',
  icon: 'icon-transfer-check',
};
const ABORTIVE = {
  type: 'preview',
  name: '流标',
  className: 'btn btn-xs btn-info',
  icon: 'icon-abortive',
};
const FULL_CHECK = {
  type: 'preview',
  name: '满标审核',
  className: 'btn btn-xs btn-info',
  icon: 'icon-full-check',
};
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
      key: 'loanExpiry', label: '投资金额',  type: 'input.text'
    },
    {
      key: 'projectType', label: '项目类型',  type: 'select', isDict: true, category: 'PROJECT_TYPE'
    },
    {
      key: 'loanExpiry', label: '投资期限', type: 'select', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key: 'transferStatus', label: '项目状态', type: 'select', isDict: true, category: 'TRANSFER_PROJECT_STATUS'
    },
    {
      key: 'transferTime',
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
      key:'projectNum', label:'项目编号'
    },
    {
      key:'trueName', label:'用户姓名',
    },
    {
      key:'phoneNumber', label:'手机号'
    },
    {
      key:'projectAmt', label:'投资金额（元）'
    },
    {
      key:'loanExpiry', label:'投资期限', isDict: true, category: 'LOAN_APPLY_EXPIRY'
    },
    {
      key:'transferTime', label:'满标划转时间'
    },
    {
      key:'transferTime', label:'申请时间'
    },
    {
      key:'transferStatus', label:'项目状态', isDict: true, category: 'TRANSFER_PROJECT_STATUS'
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
    "transferStatus": "",
    "startTransferTime": "",
    "endTransferTime": "",
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
      console.log('数据是');
      console.log(res.data);
      /*res.data.list[0].transferStatus=1;
      res.data.list[1].transferStatus=2;
      res.data.list[2].transferStatus=3;
      res.data.list[3].transferStatus=4;
      res.data.list[4].transferStatus=5;
      res.data.list[5].transferStatus=6;
      res.data.list[6].transferStatus=7;*/
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, i => {
        //return _.set(i, 'actions', [PREVIEW]);

        /*if(i.transferStatus==1){
          return _.set(i, 'actions', [PUBLISHED,TRANSFER_CHECK,ABORTIVE]);
        }else{
          return false;
        }*/
        let transferStatus = i.transferStatus;
        let actions;
        switch (transferStatus) {
          case 1:
            actions = [TRANSFER_CHECK];   //流标
            break;
          case 2:
            actions = [ABORTIVE];   //流标
            break;
          case 3:
            actions = [FULL_CHECK];            //满标审核
            break;
          case 6:
            actions = [PUBLISHED];             //待发布
            break;
          default:
            actions =[];
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
      case 'preview': this._router.navigate([url + 'transfer-view', $event.data.projectId], {relativeTo: this.route}); break;
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

