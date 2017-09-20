import { Component,OnInit, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import { StaffService } from '../../staff.service';

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
import {jsonTree} from "../../../../../theme/utils/json-tree";

@Component({
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {
  public staff: any = {};
  public family=[];
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  treeNode = [];//组织树

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

    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    }).subscribe(params => {
      if ( this._editType === 'edit' ) {
        this._staffService.getOne(params.id)
        .subscribe(res => {
          this.staff = res.data || {};
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

  /* 返回 */
  handleBackBtnClick() {
    this._location.back()
  }
  /* 保存 */
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if ( this._editType === 'add' ) {
      requestStream$ = this._staffService.createStaff(this.staff)
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
