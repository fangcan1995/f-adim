import { Component, OnInit } from "@angular/core";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeerMessageService} from "../../../theme/services/seer-message.service"
import * as _ from 'lodash';
import {log} from "util";

@Component({
  selector: 'publicAccount',
  templateUrl: './publicAccount.component.html',
  styleUrls: [ '../account.component.scss' ],
})
export class PublicAccountComponent implements OnInit {
  hasGlobalFilter = false;
  isLoading:boolean = true;
  accountList={};
  /*pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "total": "",
    "sortBy":"-effectTime",
  };*/
  titles = [
    {key: 'plaCustId', label: '账户存管平台客户号',textAlign:'center'},
    {key: 'chargeAccount', label: '线下充值户',textAlign:'center'},
    {key: 'accountName', label: '线下充值户名',textAlign:'center'},
    {key: 'chargeAmt', label: '单笔认证金额',textAlign:'center'},
  ];
  constructor(private service: AccountService,
              private _router: Router,
              private route: ActivatedRoute,
              private _messageService: SeerMessageService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.isLoading = true;
    this.service.getAccountList().then((res) => {
      /*this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数*/
      console.log('---------------')
      console.log(res)
      this.accountList = res.data;
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '数据获取失败');
    });
  }

//编辑
  onChange(message) {
    let { type, data, column} = message;
    switch (type) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this.route});
        break;

    }
  }
  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000})}

  //错误提示
  showError(message: string) {return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000})}


}
