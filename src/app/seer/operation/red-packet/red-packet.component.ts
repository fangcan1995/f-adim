import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
/*import {SeerDialogService} from "../../../theme/services/seer-dialog.service";*/
import {RedPacketService} from "./red-packet.service";

@Component({
  templateUrl: './red-packet.component.html',
  styleUrls: ['./red-packet.component.scss'],
})
export class RedPacketComponent {
  hasGlobalFilter = true;
  filters = [
    {key: 'redPacketTheme', label: '红包主题', type: 'input.text'},
    {key: 'activityTheme', label: '所属活动', type: 'input.text'},
   /* {key: 'aaa', label: '状态', type: 'select',options:[{value:'', content: '全部'},{value:'1', content: '失败'},{value:'2', content: '成功'}]},*/
    {key: 'acSendStatus', label: '活动状态', type: 'select',isDict: true, category: 'ACTIVITY_STATUS'},
    {
      key: 'issueDate',
      label: '发放日期',
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
  redPackets = [];
  titles = [
    {key: 'redPacketTheme', label: '红包主题'},
    {key: 'activityTheme', label: '所属活动'},
    {key: 'redPacketRates', label: '红包金额(元)'},
    {key: 'startSum', label: '起用金额(元)'},
    {key: 'issueDate', label: '发放日期'},
    {key: 'expirationDate', label: '截止日期'},
    {key: 'acSendStatus', label: '状态'}
  ];
  //分页、排序、检索
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":"",
    "globalSearch":"",
    "activityCode":"",
    "trigMode":"",
    "activityName":"",
    "beginStartTime":"",
    "beginEndTime":"",
    "activityStatus":"",
  };
  actionSet = {
    'SENDAGAIN': {
      'type': 'sendAgain',
      'name': '重新发送',
      'className': 'btn btn-xs btn-info',
      icon: 'icon-checkmark'
    }

  };

  constructor(private _redPacketService: RedPacketService,
              private _router: Router, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._redPacketService.getList(params)
      .subscribe(res => {
        this.redPackets = res.data;
        this.pageInfo.pageNum=res.data.pageNum;  //当前页
        this.pageInfo.pageSize=res.data.pageSize; //每页记录数
        this.pageInfo.total=res.data.total; //记录总数
        this.redPackets = res.data.list;
        this.redPackets = _.map(this.redPackets, t => {
          let actions;
          switch (t.someStatus) {
            case "1":
              actions = [this.actionSet.SENDAGAIN];
              break;
            default:
              break;
          }
          console.log(t.someStatus);
          return _.set(t, 'actions', actions);

        })
      })
  }



/*  handleFiltersChanged($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }

  handleSearchBtnClicked($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }*/



}

