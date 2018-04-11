import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
/*import {SeerDialogService} from "../../../theme/services/seer-dialog.service";*/
import {RedPacketService} from "./red-packet.service";
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  templateUrl: './red-packet.component.html',
  styleUrls: ['./red-packet.component.scss'],
})
export class RedPacketComponent {
  hasGlobalFilter = true;
  filters = [
    {key: 'name', label: '红包主题', type: 'input.text'},
    {key: 'activityName', label: '所属活动', type: 'input.text'},
    {key: 'acSendStatus', label: '发送状态', type: 'select',isDict: true, category: 'AC_SEND_STATUS'},
    {key: 'phoneNumber', label: '手机号', type: 'input.text'},
    {
      key: 'createTime',
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
    {key: 'name', label: '红包主题'},
    {key: 'activityName', label: '所属活动'},
    {key: 'trueName', label: '发送用户'},
    {key: 'phoneNumber', label: '手机号'},
    {key: 'reAmount', label: '红包金额(元)'},
    {key: 'useMinAmount', label: '起用金额(元)'},
    {key: 'createTime', label: '发放日期'},
    /*{key: 'expirationDate', label: '截止日期'},*/
    {key: 'acSendStatus', label: '状态',isDict: true, category: 'AC_SEND_STATUS'}
  ];
  //分页、排序、检索
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":"",
    "sortBy":"-createTime",
    "globalSearch":"",
    "name":"",
    "activityName":"",
    "acSendStatus":"",
    "userName":"",
    "beginCreateTime":"",
    "endCreateTime":"",
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

  getList() {
     this._redPacketService.getList(this.pageInfo)
      .then(res => {
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

  //多条件查询
  handleFiltersChanged($event) {
    let params=$event;
    let { createTime, ...otherParams } = params;
    let beginCreateTime,
      endCreateTime;
    if ( _.isArray(createTime)) {
      beginCreateTime = createTime[0] ? (formatDate(createTime[0],'YYYY-MM-DD 00:00:00')) : null;
      endCreateTime = createTime[1] ? (formatDate(createTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      beginCreateTime,
      endCreateTime,
    }

    this.pageInfo = params;
    console.log(this.pageInfo);
    this.getList();
  }

  /*handleSearchBtnClicked($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }*/

  //换页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }


}

