import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit
} from "@angular/core";
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { RoleService } from '../../role.service';
import { SeerDialogService, SeerMessageService } from '../../../../../theme/services';
import { json2Tree } from '../../../../../theme/libs';
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { TREE_PERMISSIONS } from "../../../../../theme/modules/seer-tree/constants/permissions";

@Component({
  templateUrl: './role-edit.component.html',
  styleUrls: [ './role-edit.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class RoleEditComponent implements OnInit {
  role:any = {};
  activeResources:any = [];
  activeAccounts:any = [];
  private editType:string = 'add';
  private forbidSaveBtn:boolean = true;
  private forbidResetPasswordBtn:boolean = true;
  private id:string;
  @ViewChild('myForm') myForm;
  @ViewChild('accountTree') accountTree: SeerTree;
  @ViewChild('resourceTree') resourceTree: SeerTree;
  resourceTreeNodes;
  resourcePermission = TREE_PERMISSIONS.MULTI_SELECT | TREE_PERMISSIONS.SELECT_PARENT_CASCADE;
  constructor(
    private _roleService: RoleService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    ) { }
  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    if ( this.editType === 'edit' ) {
      this._roleService.getOne(this.id)
      .then(res => {
        this.role = res.data || {};
        let data = res.data || {};
        this.role = data.roleInfo || {};
        this.activeResources = [{menuId: 1, menuPid: 0, menuName: "首页", menuType: 1, menuDesc: ""}] //data.resourceInfo || [];
        this.activeAccounts = data.accountInfo || [];
        this.forbidSaveBtn = false;
        return this.getResources();
      })
      .then(res => {
        let resources = res.data ? res.data.list || [] : [];
        this.resourceTreeNodes = json2Tree(
          resources, 
          {
            id: 'menuId',
            parentId: 'menuPid'
          }, 
          [
            {
              origin: 'menuName',
              replace: 'name'
            },
            {
              origin: 'menuId',
              replace: 'id'
            }
          ]
        );
        setTimeout(() => {
          this.resourceTree.setActiveNodes(_.map(this.activeResources, t => t['menuId']))
        })
        
      })
      .catch(err => {
        console.log(err)
        /*this.showError(err.msg || '获取角色信息失败')
        .onClose()
        .subscribe(() => {
          this._router.navigate(['/system/role']);
        });*/
      });
    } else if ( this.editType === 'add' ) {
      this._route.queryParams
      .subscribe(res => {
        this.role = _.clone(res || {})
      });
      this.forbidSaveBtn = false;
      this.getResources();
    }
  }

  getResources() {
    return this._roleService.getResourcesFromServer({pageSize: 10000})
    
  }

  handleSaveBtnClick() {
    if ( this.myForm.form.valid ) {
      this.forbidSaveBtn = true;
      if ( this.editType === 'edit' ) {
        this._roleService.putOne('', this.role)
        .then(res => {
          this.forbidSaveBtn = false;
          this.showSuccess(res.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/system/role']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '更新失败')
        })
      } else {
        this._roleService.postOne(this.role)
        .then(res => {
          this.forbidSaveBtn = false;
          this.showSuccess(res.msg || '保存成功')
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '保存失败')
        })
      }
      
    }
  }
  handleBackBtnClick() {
    this._location.back();
  }
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}