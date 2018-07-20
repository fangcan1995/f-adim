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
  isLoading:boolean = false;
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "total": "",
    "sortBy":"-effectTime",
  };
  titles = [
    {key: 'accountNo', label: '对公账号'},
    {key: 'accountName', label: '对公账户户名'},
    {key: 'AccountBk', label: '清算行号'},

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
