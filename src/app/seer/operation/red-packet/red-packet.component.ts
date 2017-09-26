import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
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
    {
      key: 'state', label: '状态', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    },
    {key: 'issueDateBegin', label: '发放日期', type: 'input.text'},
    {key: 'issueDateEnd', label: '一　　　', type: 'input.text'}
  ];

  redPackets = [];
  titles = [
    {key: 'redPacketTheme', label: '红包主题'},
    {key: 'activityTheme', label: '所属活动'},
    {key: 'redPacketRates', label: '红包金额(元)'},
    {key: 'startSum', label: '起用金额(元)'},
    {key: 'issueDate', label: '发放日期'},
    {key: 'expirationDate', label: '截止日期'},
    {key: 'state', label: '状态'}
  ];

  actionSet = {
    'sendAgain': {
      'type': 'sendAgain',
      'name': '重新发送',
      'className': 'btn btn-xs btn-info',
    }
  };

  constructor(private _redPacketService: RedPacketService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._redPacketService.getList(params)
      .subscribe(res => {
        this.redPackets = res.data;
        this.redPackets = _.map(this.redPackets, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.sendAgain];
              break;
            default:
              break;
          }
          return _.set(t, 'actions', actions);
        })
      })
  }

  onChange(message) {
    console.log(message)
    const type = message.type;
    let data = message.data;
    switch (type) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._activatedRoute});
        break;
      case 'update':
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this._redPacketService.deleteOne(message.data.id)
                .subscribe(data => {
                  this.getList();
                });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }

  handleFiltersChanged($event) {
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
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}

