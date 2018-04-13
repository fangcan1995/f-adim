import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { SeerDialogService, SeerMessageService, } from '../../../theme/services';
import { MemberService } from './member.service';
import { UPDATE, PREVIEW } from '../../common/seer-table/seer-table.actions';
import { formatDate } from "ngx-bootstrap/bs-moment/format";
@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  hasGlobalFilter = true;
  filters = [
    { key: 'userName', label: '用户名', type: 'input.text' },
    { key: 'trueName', label: '真实姓名', type: 'input.text' },
    { key: 'idNumber', label: '身份证号', type: 'input.text' },
    { key: 'phoneNumber', label: '手机号', type: 'input.text' },
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
    { key: 'status', label: '会员状态', type: 'select', isDict: true, category: 'MEMBER_STATUS' },
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
    // {key: 'invitedMember', label: '邀请人', type: 'input.text'},
  ];
  members = [];
  titles = [
    { key: 'userName', label: '用户名' },
    { key: 'trueName', label: '真实姓名' },
    { key: 'phoneNumber', label: '手机号',textAlign:'center' },
    { key: 'idNumber', label: '身份证号',textAlign:'center' },
    { key: 'sex', label: '性别', isDict: true, category: 'M_SEX',textAlign:'center' },
    { key: 'registTime', label: '注册时间',textAlign:'center' },
    { key: 'status', label: '会员状态', isDict: true, category: 'MEMBER_STATUS' ,textAlign:'center'  },
    { key: 'lastLoginTime', label: '最后登录时间' ,textAlign:'center' },
    { key: 'loginIp', label: '最后登录IP' ,textAlign:'center' },
    // {key: 'invitedMember', label: '邀请人'},
    { key: 'loginTimes', label: '登录次数' ,textAlign:'center' },
  ];
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "-registTime",
    "total": "",
    "globalSearch": "",
    "userName": "",
    "trueName": "",
    "idNumber": "",
    "phoneNumber": "",
    "classify": "",
    "ageStart": "",
    "ageEnd": "",
    "registTimeStart": "",
    "registTimeEnd": "",
    "invitedMember": "",
    "excelmaps": {
      "userName": '用户名',
      "trueName": '真实名',
      "phoneNumber": '手机号',
      "idNumber": '身份证号',
      "sex": '性别',
      "registTime": '注册时间',
      "status": '会员状态',
      "lastLoginTime": '最后登录时间',
      "loginIp": '最后登录IP',
      "loginTimes": '登录次数'
    }
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
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this._memberService.getList(this.pageInfo).then(res => {
      this.pageInfo.pageNum = res.data.pageNum;  //当前页
      this.pageInfo.pageSize = res.data.pageSize; //每页记录数
      this.pageInfo.total = res.data.total; //记录总数
      this.members = res.data.list;
      this.members = _.map(this.members, t => {
        let status = t.status;
        let actions;
        switch (status) {
          case 0://启用
            actions = [PREVIEW, UPDATE];
            break;
          case 1://锁定
            actions = [PREVIEW, UPDATE];
            break;
          case 2://停用
            actions = [PREVIEW];
            break;
          default:
            //actions = [PREVIEW,UPDATE];//临时
            break;
        }
        return _.set(t, 'actions', actions)
      });
    }).catch(err => {
      // this._dialogService.alert("ee!");
      this.showError("连接失败!");
    });
  }//获取列表
  onChange(message) {
    const type = message.type;
    let data = message.data;
    let column = message.column;
    switch (type) {
      case 'hideColumn':
        this.pageInfo.excelmaps = column;
        break;
      case 'preview':
        this._router.navigate([`detail/${data.id}`], { relativeTo: this._route });
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], { relativeTo: this._route });
        break;
      case 'export':
        this._memberService.exportForm(this.pageInfo)
          .then(res => {
            let blob = res.blob();
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = '会员管理' + '.xls';
            a.click();
            window.URL.revokeObjectURL(url);
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        break;
    }
  }//增删改
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getList();
  }//分页
  handleFiltersChanged($event) {
    let params = $event;
    let { registTime, age, ...otherParams } = params;
    let registTimeStart,
      registTimeEnd,
      mAgeStart,
      mAgeEnd;
    if (_.isArray(registTime)) {
      registTimeStart = registTime[0] ? (formatDate(registTime[0], 'YYYY-MM-DD 00:00:00')) : "";
      registTimeEnd = registTime[1] ? (formatDate(registTime[1], 'YYYY-MM-DD 23:59:59')) : "";
    }
    if (_.isArray(age)) {
      mAgeStart = age[0] ? age[0] : "";
      mAgeEnd = age[1] ? age[1] : "";
    }
    params = {
      ...otherParams,
      registTimeStart,
      registTimeEnd,
      mAgeStart,
      mAgeEnd,
    }
    // Object.assign(this.pageInfo,params);
    this.pageInfo={
      ...this.pageInfo,
      ...params
    }
    this.getList();
  }//全局搜索
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }//成功提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }//失败提示
}
