import {
  Component,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { DictService } from "./dict.service";
import * as _ from 'lodash';
import { CREATE, COPY_CREATE, UPDATE, DELETE, DELETE_MULTIPLE } from "../../common/seer-table/seer-table.actions";
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
      category: 'DICT_DEL_FLAG'
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

  pageSize: number = 10000;

  dicts = [];


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
  getList(): void {
    this._dictService.getDicts(true)
    .then(res => {
      if ( res.code == 0 ) {
        this.dicts = res.data || [];
        this.dicts = _.map(this.dicts, r => _.set(r, 'actions', [ COPY_CREATE, UPDATE, DELETE ]));
      } else {
        this.showError( res.msg || '获取字典失败' );
      }
    });
  }
  /*更新*/
  handleNotify(message): void {
    const { type, data } = message;
    switch ( type ) {
      case CREATE.type:
        this._router.navigate(['/system/dict/add']);
        break;
      case COPY_CREATE.type:
        let queryParams = {
          category: data.category,
          categoryName: data.categoryName,
          itemId: data.itemId,
          itemName: data.itemName,
          itemSort: data.itemSort,
          delFlag: data.delFlag
        }
        this._router.navigate(['/system/dict/add'], {queryParams});
        break;
      case UPDATE.type:
        this._router.navigate([`/system/dict/edit/${data.id}`]);
        break;
      case DELETE.type:
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
      case DELETE_MULTIPLE.type:
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }
  handleFiltersChanged($event) {
    /*let params=$event;
    this.pageInfo = {
       ...this.pageInfo,
       ...params,
    };
    this.getList();*/
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
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
  //分页
  alertSuccess(msg:string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: msg,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      //this._router.navigate(['/system/resource-manage/'])
    });
  }
  alertError(errMsg:string){
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }
}

