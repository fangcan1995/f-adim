/*
import { Component, OnInit } from '@angular/core';
import { DictManageService } from "../dict-manage.service";
import { DICT_TRANSLATE } from "./dict.translate";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service"
import {COPY_CREATE,UPDATE, DELETE} from "../../../common/seer-table/seer-table.actions"
*/


import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import { DictManageService } from "../dict-manage.service";
import {Router} from "@angular/router";
//import {GlobalState} from "../../../../../global.state";
import * as _ from 'lodash';
import { Location } from '@angular/common';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service"
import {COPY_CREATE,UPDATE, DELETE} from "../../../common/seer-table/seer-table.actions"
import { SeerMessageService } from '../../../../theme/services/seer-message.service';

@Component({
  selector: 'DictComponent',
  styleUrls: ['./dict.component.scss'],
  templateUrl: './dictComponent.html',
  providers: [],
})
export class DictComponent implements OnInit{
  title = '字典管理';
  hasGlobalFilter = true;
  filters = [
    {
      key: 'category',
      label: '字典编号',
      type: 'input.text',
    },
    {
      key: 'categoryName',
      label: '字典名称',
      type: 'input.text',
    }
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"id,itemSort",
    "total":"",
    "query":{
      "globalSearch":"",
      "category":"",
      "categoryName":"",
    },
  }; //分页、排序、检索
  addTitle: string;
  data = [];
  currentDict;
  titles = [
    {
      key:'category',
      label:'字典编号',
    },
    {
      key:'categoryName',
      label:'字典名称',
    },
    {
      key:'itemId',
      label:'值编号',
    },
    {
      key:'itemName',
      label:'值名称',
    },
    {
      key:'itemSort',
      label:'排序',
    },
    {
      key:'delFlag',
      label:'有效状态',
      isDict: true,
    },
  ];
  //translate = DICT_TRANSLATE;
  errorMessage;
  checkAllinput = false;
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = false;
  IsEdit=false;


  constructor(private dictManageService:DictManageService,private _dialogService: SeerDialogService,private _location: Location,
              private _messageService: SeerMessageService,){}

  ngOnInit() {

    this.getDicts();
  }
  /*获取列表*/
  getDicts(): void {
    this.dictManageService.getDicts(this.pageInfo).then(
        data => {
          this.pageInfo.pageNum=data.data.pageNum;  //当前页
          this.pageInfo.pageSize=data.data.pageSize; //每页记录数
          this.pageInfo.total=data.data.total; //记录总数
          this.data = data.data.list;

          this.data = _.map(this.data, r => _.set(r, 'actions', [ COPY_CREATE,UPDATE, DELETE ]));
        },
        error =>  this.errorMessage = <any>error);
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        //this._router.navigate(['/system/resource-manage/edit']);

        this.addTitle = "新建字典";
        this.currentDict = {};
        this.checkAllinput = false;
        break;
      case 'copy_create':
        this.addTitle = "新建字典";
        this.currentDict = {
          category:message.data.category,
          categoryName : message.data.categoryName,
          delFlag:message.data.delFlag
        };
        this.checkAllinput = false;
        break;
      case 'update':
        this.addTitle = "修改字典";
        this.currentDict = message.data;
        this.IsEdit=true;
        this.checkAllinput = false;
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.dictManageService.deleteDict(message.data.id).then((data) => {
                if ( data.code=='0' ){
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

  //保存
  saveDict(): void{
    if(this.currentDict){
      this.dictManageService.putOne(this.currentDict).then(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.dictManageService.postOne(this.currentDict).then(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }
  }
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;

    let requestStream$;
    if(!this.currentDict.id){
      this.dictManageService.postOne(this.currentDict).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("添加成功");
        }else{
          this.alertError("添加失败");
        }
      });
    } else{
      this.dictManageService.putOne(this.currentDict).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("更新成功");
        }else{
          this.alertError("更新失败");
        }
      });
    }
    this.getDicts();
  }//保存按钮处理函数
  handleBackBtnClick() {
    this.getDicts();
  } //返回按钮处理函数
  handleFiltersChanged($event) {
    let params=$event;
    this.pageInfo.query = params;
    console.log(params);
    this.getDicts();
  }

  handleSearchBtnClicked($event) {


    /*this.queryParams = $event;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)*/
  }

  onPageChange($event) {
    /*console.log($event);
    this.pageSize = $event.pageSize;
    this.pageNum = $event.pageNum;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)*/
  }
  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      //this._router.navigate(['/system/resource-manage/'])
    });
  }
  alertError(errMsg:string){
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }
}

