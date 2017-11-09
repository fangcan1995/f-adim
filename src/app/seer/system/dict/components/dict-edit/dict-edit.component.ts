import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { CustomValidators } from 'ng2-validation';

import { DictService } from "../../dict.service";
import * as _ from 'lodash';
import { SeerDialogService } from '../../../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './dict-edit.component.html',
  styleUrls: [ './dict-edit.component.scss' ],
})
export class DictEditComponent implements OnInit {
  dict: any = {};
  editType: string = 'add';
  forbidSaveBtn: boolean = true;
  id: string;
  @ViewChild('myForm') myForm;
  constructor(
    private _dictService: DictService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    ) { }
  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    if ( this.editType === 'edit' ) {
      this._dictService.getOne(this.id)
      .then(res => {
        this.dict = res.data || {};
        this.forbidSaveBtn = false;
      })
      .catch(err => {
        this.showError(err.msg || '获取字典信息失败')
      });
    } else if ( this.editType === 'add' ) {
      this._route.queryParams
      .subscribe(res => {
        this.dict = _.clone(res || {})
      });
      this.forbidSaveBtn = false;
    }
  }
  handleSaveBtnClick() {
    console.log(this.dict)
    if ( this.myForm.form.valid ) {
      this.forbidSaveBtn = true;
      if ( this.editType === 'edit' ) {
        this._dictService.putOne('', this.dict)
        .then(res => {
          this.forbidSaveBtn = false;
          this._dictService.getDicts(true)
          this.showSuccess(res.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/system/dict']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '更新失败')
        })
      } else {
        this._dictService.postOne(this.dict)
        .then(res => {
          this.forbidSaveBtn = false;
          this._dictService.getDicts(true)
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