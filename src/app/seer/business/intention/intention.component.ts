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
    { key: 'loanApplyType', label: '借款类型', type: 'select', options: [ { content: '全部' }, { value: '0', content: '汇车贷' }, { value: '1', content: '汇房贷', }, { value: '2', content: '汇信贷', }]},
    { key: 'loanApplyExpiry', label: '借款期限', type: 'select', options: [ { content: '全部' }, { value: '0', content: '3个月' }, { value: '1', content: '6个月', }, { value: '2', content: '12个月', }]},
    { key: 'applyStatus', label: '项目状态', type: 'select', options: [ { content: '全部' }, { value: '0', content: '待资料补全' }, { value: '1', content: '待初审', }, { value: '2', content: '待复审', }]},
    { key: 'applyTimeStart', label: '申请时间', type: 'input.text' },
    { key: 'applyTimeEnd', label: '至', type: 'input.text' },
  ];

  title = '意向处理';
  data = [];
  titles = [
    { key:'projectId', label:'项目编号' },
    { key:'projectName', label:'项目名称', },
    { key:'memberId', label:'会员编号' },
    { key:'memberName', label:'会员姓名' },
    { key:'loanAmount', label:'借款金额' },
    { key:'lifeOfLoan', label:'借款期限' },
    { key:'applyTime', label:'申请时间' },
    { key:'projectStatus', label:'项目状态' },
  ];
  actionSet = {
    'completion': {
      'type': 'completion',
      'name': '补全资料',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-edit'
    }
  }

  constructor(
    private intentionService: IntentionService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList(params?): void{
    this.intentionService.getIntentions().then((result: any) => {
      if("0" == result.code) {
        this.data = result.data;
        this.data = _.map(this.data, t => {
          let actions = [this.actionSet.completion];
          return _.set(t, 'actions', actions);
        });
      }else {
        console.log(result.message);
      }
    });
  }




  onChange(item) {
    const type = item.type;
    let data = item.data;
    switch (type) {
      case 'completion':
        this._router.navigate(['completion', data.projectId],{relativeTo: this.route});
    }
  }
}

