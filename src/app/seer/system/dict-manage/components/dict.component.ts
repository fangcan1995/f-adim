import { Component } from '@angular/core';
import { DictManageService } from "../dict-manage.service";
import { DICT_TRANSLATE } from "./dict.translate";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service"
import {COPY_CREATE,UPDATE, DELETE} from "../../../common/seer-table/seer-table.actions"
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
          this.data = _.map(this.data, r => _.set(r, 'actions', [ COPY_CREATE,UPDATE, DELETE ]));
        },
        error =>  this.errorMessage = <any>error);
  }
  /*更新*/
  onChange(message):void {

    if(message.type=='create'){
      this.addTitle = "新建字典";
      this.currentDict = {
      };
      this.checkAllinput = false;
    }

    if(message.type=='copy_create'){
      this.addTitle = "新建字典";
      this.currentDict = {
        dictKeyId:message.data.dictKeyId,
        dictKeyName : message.data.dictKeyName,
        validState:message.data.validState
      };
      this.checkAllinput = false;
    }


    if(message.type=='update'){
      this.addTitle = "修改字典";
      this.currentDict = message.data;
      console.log(message.data);

      this.checkAllinput = false;
    }
    if(message.type=='delete'){
      this.dictManageService.removeDict(message.data.dictId)
        .subscribe(
          res => {
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }
    if(message.type=='delete_all'){

      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.dictId)
      });
      this.dictManageService.removeAllSelectedDicts(ids)
        .subscribe(
          res => {
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);

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

