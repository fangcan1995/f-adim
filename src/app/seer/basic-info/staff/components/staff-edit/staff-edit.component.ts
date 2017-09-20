import {
  Component,
  OnInit,
  TemplateRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts,
} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { SeerMessageService } from '../../../../../theme/services/seer-message.service';

import { StaffService } from '../../staff.service';
import {
  titles,
} from '../../staff.config';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import {jsonTree} from "../../../../../theme/utils/json-tree";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../../../../theme/modules/seer-tree/constants/events";
import {SeerTree} from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";

@Component({
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  titlesEducation=[
    {
      key:'school',
      label:'毕业院校',
    },
    {
      key:'profession',
      label:'所学专业',
    },
    {
      key:'degree',
      label:'学位',
    },
    {
      key:'graduationDate',
      label:'毕业时间',
    },
  ];
  titlesFamily=[
    {
      key:'relation',
      label:'与本人关系',
    },
    {
      key:'name',
      label:'姓名',
    },
    {
      key:'work',
      label:'工作单位及职务',
    },
    {
      key:'phone',
      label:'联系电话',
    },
  ];
  titlesBusinessHistory=[
    {
      key:'startAndStopDate',
      label:'起止日期',
    },
    {
      key:'unit',
      label:'所学专业',
    },
    {
      key:'position',
      label:'职务/工种',
    },
    {
      key:'reterence',
      label:'证明人',
    },
    {
      key:'telephone',
      label:'联系电话',
    },
  ];
  isDimission=false;
  public staff: any = {};
  public family=[];
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  //组织树
  treeTitle = "组织机构树";
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.ADD|TREE_PERMISSIONS.EDIT|TREE_PERMISSIONS.DELETE|TREE_PERMISSIONS.DRAG|TREE_PERMISSIONS.SHOW_FILTER|TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = [];
  //下面两个为多个checkbox选择插件配置
  dropdownSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  myRepertoryTexts: IMultiSelectTexts = {
    checkAll: '选中所有',
    uncheckAll: '取消所有',
    checked: '个选中',
    checkedPlural: '个选中',
    searchPlaceholder: '搜索...',
    defaultTitle: '选择账号',
  };
  private accountData: IMultiSelectOption[] = [];


  public titles = titles;

  constructor(
    private _staffService: StaffService,
    private _messageService: SeerMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.getOrganizations();
    //this.isDimission=false;
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
    .subscribe(params => {
      if ( this._editType === 'edit' ) {
        this._staffService.getOne(params.id)
        .subscribe(res => {

          this.staff = res.data || {};
          //this.family= res.data.family;

          //console.log(this.staff);
          this.forbidSaveBtn = false;
        }, errMsg => {
          // 错误处理的正确打开方式
          this._messageService.open({
            icon: 'fa fa-times-circle',
            message: errMsg,
            autoHideDuration: 3000,
          }).onClose().subscribe(() => {
            this._location.back()
          })
        })
      } else if ( this._editType === 'add' ) {
        this.forbidSaveBtn = false;
      }
    })
  }


  handleBackBtnClick() {
    this._location.back()
  }
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if ( this._editType === 'edit' ) {
      //console.log(this.staff);
      requestStream$ = this._staffService.putOne(this.staff.id, this.staff)
    } else {
      return;
    }
    requestStream$
      .subscribe(res => {
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: res.msg,
          autoHideDuration: 3000,
        }).onClose().subscribe(() => {
          this._router.navigate(['/basic-info/staff-manage'])
        });
      }, errMsg => {
        this.forbidSaveBtn = false;
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        })
      })

  }
  /*离职处理,员工状态选中离职后，激活离职时间按钮*/
  staffStateChange(staffStateId:any){
    if(staffStateId=='02'){
      this.isDimission=true;
    }else{
      this.isDimission=false;
    }
  }
  /* 获取全部组织机构 */
  getOrganizations() {
    this._staffService.getOrganizations().then((result) => {
      result.data.map(org=>org['children']=[]);
      let nodes = jsonTree(result.data,{parentId:'orgParentId',children:'children'},[{origin:'orgName',replace:'name'}]);
      this.treeNode = nodes;
    });
  }
  /* 模态层 */
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
