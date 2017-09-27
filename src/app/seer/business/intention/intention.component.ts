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
    /*{ key: 'name', label: '用户名', type: 'input.text' },
    { key: 'gender', label: '性别', type: 'select', options:
      [ { content: '请选择' },
        { value: '0', content: '男' },
        { value: '1', content: '女', }
      ]
    },
    { key: 'mobile', label: '手机号', type: 'input.text' },*/
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

  ngOnInit(): void {
    this.getList();
  }
  getList(params?) {
    this.data = this.intentionService.getIntentionList(params);
    this.data = _.map(this.data, t => {
      let actions = [this.actionSet.completion];
      return _.set(t, 'actions', actions);
    })
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

