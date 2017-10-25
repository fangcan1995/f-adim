import {
  Component,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { DictService } from "./dict.service";
import * as _ from 'lodash';
import { COPY_CREATE, UPDATE, DELETE } from "../../common/seer-table/seer-table.actions";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../theme/services/seer-message.service';
@Component({
  templateUrl: './dict.component.html',
  styleUrls: [ './dict.component.scss' ],
})
export class DictComponent implements OnInit {
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
  pageInfo = {
    pageNum: 1,
    pageSize: 10,
    sort: "-id,-itemSort",
    total: "",
    globalSearch: "",
    category: "",
    categoryName: "",
  };
  dicts = [];
  errorMessage;
  checkAllinput = false;
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = false;
  IsEdit = false;


  constructor(
    private _dictService: DictService,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService,
    private _router: Router,
    ){}

  ngOnInit() {
    this.getList();
  }

  /*获取列表*/
  getList(params?): void {
    this._dictService.getList(this.pageInfo)
    .then( res => {
      this.pageInfo.pageNum = res.data.pageNum;  //当前页
      this.pageInfo.pageSize = res.data.pageSize; //每页记录数
      this.pageInfo.total = res.data.total; //记录总数
      this.dicts = res.data.list;

      this.dicts = _.map(this.dicts, r => _.set(r, 'actions', [ COPY_CREATE,UPDATE, DELETE ]));
    },
    error =>  this.errorMessage = <any>error);
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['/system/dicts/add']);

        /*this.addTitle = "新建字典";
        this.currentDict = {};
        this.checkAllinput = false;*/
        break;
      case 'copy_create':
        this._router.navigate(['/system/dicts/add']);
        /*this.addTitle = "新建字典";
        this.currentDict = {
          category:message.data.category,
          categoryName : message.data.categoryName,
          delFlag:message.data.delFlag
        };
        this.checkAllinput = false;*/
        break;
      case 'update':
        console.log(data)
        this._router.navigate([`/system/dicts/edit/${321}`]);
        /*this.addTitle = "修改字典";
        this.currentDict = message.data;
        this.IsEdit=true;
        this.checkAllinput = false;*/
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this._dictService
              .deleteOne(message.data.id)
              .then((data) => {
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

  //保存
  saveDict(): void{
    /*if(this.currentDict){
      this._dictService.putOne(this.currentDict).then(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this._dictService.postOne(this.currentDict).then(
          res => {
            this.currentDict = false;
            this.checkAllinput = false;
            this.getDicts();
          },
          error =>  this.errorMessage = <any>error);
    }*/
  }
  handleSaveBtnClick() {
    /*if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;

    let requestStream$;
    if(!this.currentDict.id){
      this._dictService.postOne(this.currentDict).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("添加成功");
        }else{
          this.alertError("添加失败");
        }
      });
    } else{
      this._dictService.putOne(this.currentDict).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("更新成功");
        }else{
          this.alertError("更新失败");
        }
      });
    }*/
    this.getList();
  }//保存按钮处理函数
  handleBackBtnClick() {
    this.getList();
  } //返回按钮处理函数
  handleFiltersChanged($event) {
    let params=$event;
    this.pageInfo = {
       ...this.pageInfo,
       ...params,
    };
    console.log(params);
    this.getList();
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

  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }//分页
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

