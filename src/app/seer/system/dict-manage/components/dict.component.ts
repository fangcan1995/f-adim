import { Component } from '@angular/core';
import { DictManageService } from "../dict-manage.service";
import { DICT_TRANSLATE } from "./dict.translate";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service"
@Component({
  selector: 'DictComponent',
  styleUrls: ['./dict.component.scss'],
  templateUrl: './dictComponent.html',
  providers: [],
})
export class DictComponent {
  title = '字典管理';
  hasGlobalFilter = true;
  filters = [
    {
      key: 'dictKeyId',
      label: '类型编号',
      type: 'input.text',
    },
    {
      key: 'dictKeyName',
      label: '类型名称',
      type: 'input.text',
    }
  ];
  addTitle: string;
  data = [];
  actionSet = {
    'copy': {
      'type': 'copy',
      'name': '复制新增',
      'className': 'btn btn-xs btn-default',
    },
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
    }
  };
  currentDict;
  titles = [
    {
      key:'dictKeyId',
      label:'类型编号',
    },
    {
      key:'dictKeyName',
      label:'类型名称',
    },
    {
      key:'dictValueId',
      label:'值编号',
    },
    {
      key:'dictValueName',
      label:'值名称',
    },
    {
      key:'dictSort',
      label:'排序',
    },
    {
      key:'validState',
      label:'有效状态',
      isDict: true,
    },
  ];
  translate = DICT_TRANSLATE;
  errorMessage;
  checkAllinput = false;

  constructor(private dictManageService:DictManageService,private _dialogService: SeerDialogService,){}

  ngOnInit() {
    this.getDicts();
  }
  /*获取列表*/
  getDicts(): void {
    this.dictManageService.getDicts()
      .subscribe(
        res => {
          this.data = res.data;
          this.data = _.map(this.data, t =>{
            let actions;
            actions = [this.actionSet.copy, this.actionSet.update, this.actionSet.delete];
            return _.set(t, 'actions', actions);
          })
        },
        error =>  this.errorMessage = <any>error);
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'add':
        this.addTitle = "新建字典";
        this.currentDict = {};
        this.checkAllinput = false;
        break;
      case 'copy':
        this.addTitle = "新建字典";
        this.currentDict = {
          dictKeyId:message.data.dictKeyId,
          dictKeyName : message.data.dictKeyName,
          validState:message.data.validState
        };
        this.checkAllinput = false;
        break;
      case 'update':
        this.addTitle = "修改字典";
        this.currentDict = message.data;
        this.checkAllinput = false;
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.dictManageService.removeDict(message.data.dictId).subscribe((data) => {
                if ( data.success ){
                  this.getDicts();
                }else {
                  alert("删除失败");
                }
              });
            }
          })
        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }
  /*保存*/
  saveDict(): void{
    if(this.currentDict.dictId){
      this.dictManageService.updateDict(this.currentDict)
        .subscribe(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.dictManageService.addDict(this.currentDict)
        .subscribe(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }
  }
}

