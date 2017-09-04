import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { MemberService } from './member.service';
@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit, OnDestroy {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'name',
      label: '用户名',
      type: 'input.text',
    },
    {
      key: 'real_name',
      label: '真实姓名',
      type: 'input.text',
    },
    {
      key: 'gender',
      label: '性别',
      type: 'select',
      options: [
        {
          content: '请选择'
        },
        {
          value: '0',
          content: '男'
        },
        {
          value: '1',
          content: '女',
        }
      ]
    },
    {
      key: 'mobile',
      label: '手机号',
      type: 'input.text',
    },
  ]
  title = '角色列表';
  data = [];
  members = [];
  titles = [
    { key:'name', label:'用户名' },
    { key:'real_name', label:'真实姓名', },
    { key:'id_number', label:'身份证号' },
    { key:'mobile', label:'手机号' },
  ];
  actionSet = {
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
    },
    'copyAdd': {
      'type': 'copyAdd',
      'name': '复制新增',
      'className': 'btn btn-xs btn-default',
    }
  }
  constructor(
    private _memberService: MemberService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  getList(params?) {
    this._memberService.getList(params)
    .subscribe(res => {
      this.members = res.data;
      this.members = _.map(this.members, t => {
        let status = t.someStatus;
        let actions;
        switch(status) {
          case "1": 
            actions = [this.actionSet.update, this.actionSet.delete];
            break;
          case "2":
            actions = [this.actionSet.copyAdd, this.actionSet.delete];
            break;
          case "3":
            actions = [this.actionSet.update];
            break;
          default:
            break;
        }
        return _.set(t, 'actions', actions)
      })
    })
  }
  onChange(message) {
    console.log(message)
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'add':
        this._router.navigate(['add'], {relativeTo: this._route} );
        break;
      case 'update': 
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._route} );
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
        .subscribe(action => {
          if ( action === 1 ) {
            this._memberService.deleteOne(message.data.id)
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
  ngOnDestroy(): void {
    console.log('member component destroied')
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
}