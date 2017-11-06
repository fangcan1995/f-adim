import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from '../../../theme/services/seer-dialog.service';
import {MemberService} from './member.service';
import { UPDATE, PREVIEW } from '../../common/seer-table/seer-table.actions';
import {formatDate} from "ngx-bootstrap/bs-moment/format";
@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  hasGlobalFilter = true;
  filters = [
    {key: 'userName', label: '用户名', type: 'input.text'},
    {key: 'trueName', label: '真实姓名', type: 'input.text'},
    {key: 'idNumber', label: '身份证号', type: 'input.text'},
    {key: 'phoneNumber', label: '手机号', type: 'input.text'},
    {
      key: 'age',
      label: '年龄',
      groups: [
        {
          type: 'input.text',
        },
        {
          type: 'input.text',
        },
      ],
      groupSpaces: ['至']
    },
    {
      key: 'classify', label: '会员状态', type: 'select',
      options: [
        {content: '请选择'},
        {value: '1', content: '登录帐号锁定'},
        {value: '2', content: '启用'},
        {value: '3', content: '停用'}
      ]
    },
    {
      key: 'registTime',
      label: '注册时间',
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
    {key: 'invitedMember', label: '邀请人', type: 'input.text'},
  ];
  members = [];
  titles = [
    {key: 'userName', label: '用户名'},
    {key: 'trueName', label: '真实姓名'},
    {key: 'phoneNumber', label: '手机号'},
    {key: 'idNumber', label: '身份证号'},
    {key: 'sex', label: '性别'},
    {key: 'registTime', label: '注册时间'},
    {key: 'classify', label: '会员状态'},
    {key: 'lastLoginTime', label: '最后登录时间'},
    {key: 'loginIp', label: '最后登录IP'},
    {key: 'invitedMember', label: '邀请人'},
    {key: 'loginTimes', label: '登录次数'},
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-createTime",
    "total":"",
    "query":{
      "globalSearch":"",
      "userName":"",
      "trueName":"",
      "idNumber":"",
      "phoneNumber":"",
      "classify":"",
      "ageStart":"",
      "ageEnd":"",
      "registTimeStart":"",
      "registTimeEnd":"",
      "invitedMember":""
    },

  }; //分页、排序、检索
  customActions = [
    {
      type: 'user_statistics',
      name: '用户统计',
      className: 'btn btn-xs btn-default',
    }
  ];

  constructor(private _memberService: MemberService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _dialogService: SeerDialogService,) {}

  ngOnInit(): void {
    this.getList();
  }
  //获取列表
  getList() {
    this._memberService.getList(this.pageInfo).then(res => {
        this.pageInfo.pageNum=res.data.pageNum;  //当前页
        this.pageInfo.pageSize=res.data.pageSize; //每页记录数
        this.pageInfo.total=res.data.total; //记录总数
        this.members = res.data.list;
        this.members = _.map(this.members, t => {
          let status = t.classify;
          let actions;
          switch (status) {
            case "1":
              actions = [PREVIEW,UPDATE];
              break;
            case "3":
              actions = [PREVIEW,UPDATE];
              break;
            default:
              actions = [PREVIEW,UPDATE];
              break;
          }
          return _.set(t, 'actions', actions)
        });
      }).catch(err=>{
      err.json().message
    });
  }

  //
  onChange(message) {
    const type = message.type;
    let data = message.data;
    switch (type) {
      case 'preview':
        this._router.navigate([`detail/${data.id}`], {relativeTo: this._route});
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;

    }
  }

  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }
  //全局搜索
  handleFiltersChanged($event) {
    let params=$event;
    let { registTime,age, ...otherParams } = params;
    let registTimeStart,
      registTimeEnd,
      ageStart,
      ageEnd;
    if ( _.isArray(registTime)) {
      registTimeStart = registTime[0] ? (formatDate(registTime[0],'YYYY-MM-DD 00:00:00')) : null;
      registTimeEnd = registTime[1] ? (formatDate(registTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    if ( _.isArray(age)) {
      ageStart = age[0] ? age[0] : null;
      ageEnd = age[1] ? age[1] : null;
    }
    params = {
      ...otherParams,
      registTimeStart,
      registTimeEnd,
      ageStart,
      ageEnd,
    }
    //console.log(params);
    this.pageInfo.query = params;
    this.getList();
  }
}
