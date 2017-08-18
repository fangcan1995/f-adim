import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from 'lodash';
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
    { key:'real_name', label:'真实姓名', isDict: true },
    { key:'id_number', label:'身份证号' },
    { key:'mobile', label:'手机号' },

  ];
  constructor(
    private _memberService: MemberService,
    private _router: Router,
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  getList(params?) {
    this._memberService.getList(params)
    .subscribe(res => {
      this.members = res.data;
    })
  }
  onChange(message) {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'add':
        this._router.navigate(['/seer/basic/member/add']);
        break;
      case 'update': 
        this._router.navigate([`/seer/basic/member/edit/${message.data.id}`]);
        break;
      case 'delete':
        this._memberService.deleteOne(message.data.id)
        .subscribe(data => {
          this.getList();
        });
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