import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import { IntentionService } from "./intention.service";

@Component({

  templateUrl: './intention.component.html',
  styleUrls: ['./intention.component.scss'],
})
export class IntentionComponent {

  hasGlobalFilter = true;

  filters = [
    { key: 'userName', label: '用户姓名', type: 'input.text' },
    { key: 'phoneNumber', label: '手机号', type: 'input.text' },
    { key: 'loanApplyType', label: '借款类型', type: 'select', isDict: true, category: 'LOAN_APPLY_TYPE'},
    { key: 'loanApplyExpiry', label: '借款期限', type: 'select', isDict: true, category: 'LOAN_APPLY_EXPIRY' },
    { key: 'applyStatus', label: '项目状态', type: 'select', isDict: true, category: 'PROJECT_STATUS' },
    { key: 'applyTimeStart', label: '申请时间', type: 'input.text' },
    { key: 'applyTimeEnd', label: '至', type: 'input.text' },
  ];

  titles = [
    { key:'applyNum', label:'项目编号' },
    { key:'userName', label:'用户名', },
    { key:'phoneNumber', label:'手机号' },
    { key:'loanApplyType', label:'借款类型', isDict: true, category: 'LOAN_APPLY_TYPE'},
    { key:'applyAmt', label:'借款金额' },
    { key:'loanApplyExpiry', label:'借款期限', isDict: true, category: 'LOAN_APPLY_EXPIRY' },
    { key:'applyTime', label:'申请时间' },
    { key:'projectStatus', label:'项目状态', isDict: true, category: 'PROJECT_STATUS' },
  ];
  actionSet = {
    'completion': {'type': 'completion', 'name': '补全资料', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'firstAudit': {'type': 'firstAudit', 'name': '初审', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'secondAudit': {'type': 'secondAudit', 'name': '复审', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'}
  }

  pageInfo = {
    "pageNum":1,
    "pageSize":10,
    "sort":"-createTime",
    "total":"",
    "globalSearch":"",
    "userName":"",
    "phoneNumber":"",
    "loanApplyType":"",
    "loanApplyExpiry":"",
    "applyStatus":"",
    "applyTimeStart":"",
    "applyTimeEnd":"",

  }; //分页、排序、检索

  source = [];

  constructor(private intentionService: IntentionService, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getIntentions();
  }

  //初始化数据
  getIntentions(): void{
    this.intentionService.getIntentions(this.pageInfo).then((res: any) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, i => {
        let projectStatus = i.projectStatus;
        let actions;
        switch (projectStatus) {
          case "10": actions = [this.actionSet.completion]; break; //补填资料
          case "20": actions = [this.actionSet.firstAudit]; break; //初审
          case "30": actions = [this.actionSet.secondAudit]; break; //复审
          default: actions = []; break; //补填资料
        }
        return _.set(i, 'actions', actions);
      });
    });
  }

  //分页查询
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getIntentions();
  }

  //全局检索
  handleFiltersChanged($event) {
    let params = $event;
    this.pageInfo = Object.assign({}, this.pageInfo, params);
    this.getIntentions();
  }

  //操作
  onChange($event) {
    console.log($event);
    const type = $event.type;
    let data = $event.data;
    switch (type) {
      case 'completion': this._router.navigate(['../completion', data.id],{relativeTo: this.route}); break;
      case 'firstAudit': this._router.navigate(['../firstAudit', data.id],{relativeTo: this.route}); break;
      case 'secondAudit': this._router.navigate(['../secondAudit', data.id],{relativeTo: this.route}); break;
    }
  }
}

