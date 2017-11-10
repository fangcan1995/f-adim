import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import { IntentionService } from "./intention.service";
import {PREVIEW} from "../../common/seer-table/seer-table.actions";

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
    'secondAudit': {'type': 'secondAudit', 'name': '复审', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'release': {'type': 'release', 'name': '标的发布', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'investing': {'type': 'investing', 'name': '投资中', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'fillAudit': {'type': 'fillAudit', 'name': '满标审核', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'repaying': {'type': 'repaying', 'name': '还款中', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'prepayApply': {'type': 'prepayApply', 'name': '提前还款申请中', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'prepayAudit': {'type': 'prepayAudit', 'name': '提前还款审核', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'prepaying': {'type': 'prepaying', 'name': '提前还款中', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'failure': {'type': 'failure', 'name': '已流标', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},
    'end': {'type': 'end', 'name': '已结清', 'className': 'btn btn-xs btn-info', 'icon': 'icon-edit'},

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
          case "10":
            actions = [PREVIEW, this.actionSet.completion]; break; //待补填资料
          case "20":
            actions = [PREVIEW, this.actionSet.firstAudit]; break; //待初审
          case "30":
            actions = [PREVIEW, this.actionSet.secondAudit]; break; //待复审
          case "40":
            actions = [PREVIEW, this.actionSet.release]; break; //待标的发布
          //case "50":
          // actions = [this.actionSet.investing]; break; //投资中
          case "60":
            actions = [PREVIEW, this.actionSet.fillAudit]; break; //待满标审核
          //case "70":
          // actions = [this.actionSet.repaying]; break; //还款中
          //case "80":
          // actions = [this.actionSet.prepayApply]; break; //提前还款申请
          case "81":
            actions = [PREVIEW, this.actionSet.prepayAudit]; break; //待提前还款审核
          //case "82":
          // actions = [this.actionSet.prepaying]; break; //提前还款中
          //case "90":
          // actions = [this.actionSet.failure]; break; //流标
          //case "100":
          // actions = [this.actionSet.end]; break; //已结清
          default:
            actions = [PREVIEW]; break; //补填资料
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
    switch ($event.type) {
      case 'completion':
        this._router.navigate(['../completion', $event.data.id],{relativeTo: this.route});
        break;
      case 'firstAudit':
        this._router.navigate(['../firstAudit', $event.data.id],{relativeTo: this.route});
        break;
      case 'secondAudit':
        this._router.navigate(['../secondAudit', $event.data.id],{relativeTo: this.route});
        break;
      case 'release':
        this._router.navigate(['release', $event.data.id],{relativeTo: this.route});
        break;
      case 'investing':
        this._router.navigate(['investing', $event.data.id],{relativeTo: this.route});
        break;
      case 'fillAudit':
        this._router.navigate(['fillAudit', $event.data.id],{relativeTo: this.route});
        break;
      case 'repaying':
        this._router.navigate(['repaying', $event.data.id],{relativeTo: this.route});
        break;
      case 'prepayApply':
        this._router.navigate(['prepayApply', $event.data.id],{relativeTo: this.route});
        break;
      case 'prepayAudit':
        this._router.navigate(['prepayAudit', $event.data.id],{relativeTo: this.route});
        break;
      case 'prepaying':
        this._router.navigate(['prepaying', $event.data.id],{relativeTo: this.route});
        break;
      case 'failure':
        this._router.navigate(['failure', $event.data.id],{relativeTo: this.route});
        break;
      case 'end':
        this._router.navigate(['end', $event.data.id],{relativeTo: this.route});
        break;
      case 'preview':
        this._router.navigate(['../detail', $event.data.id],{relativeTo: this.route});
        break;
      case 'create':
        this._router.navigate(['../create'],{relativeTo: this.route});
        break;
    }

  }
}

