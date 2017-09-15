import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DictManageService } from "../dict-manage.service";
import { DICT_TRANSLATE } from "./dict.translate";

@Component({
  selector: 'DictComponent',
  styleUrls: ['./dict.component.scss','./dicthead.component.css'],
  templateUrl: './dictComponent.html',
  providers: [],
})
export class DictComponent {
  title = '字典管理';
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
    },
  ];

  titleOption =[
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
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
    }
  ];

  translate = DICT_TRANSLATE;
  errorMessage;
  checkAllinput = false;

  constructor(private dictManageService:DictManageService){}

  ngOnInit() {
    this.getDicts();
  }

  checkAllInput(){
    this.checkAllinput = true;
  }

  getDicts(): void {
    this.dictManageService.getDicts()
      .subscribe(
        res => {
          this.data = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {

    if(message.type=='add'){
      this.addTitle = "新建字典";
      this.currentDict = {
      };
      this.checkAllinput = false;
    }

    if(message.type=='copy'){
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

  cancel(): void{
    this.currentDict = false;
    this.getDicts();
  }

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

  checkValueId(number): boolean{
    if(number!=null){
      const reg = new RegExp('^(0|[0-9][0-9]*)$');
      if(number.length==2 && number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkSort(number): boolean{
    if(number!=null){
      if(number>=0){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

}

