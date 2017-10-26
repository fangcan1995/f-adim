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
  dict = {};
  private editType: string = 'add';
  private forbidSaveBtn: boolean = true;
  @ViewChild('myForm') myForm;
  constructor(
    private _dictService: DictService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    ) {
      
  }
  ngOnInit() {
    console.log(this._route.snapshot.url[0].path)
    this.editType = this._route.snapshot.url[0].path;
    if ( this.editType === 'edit' ) {
      this._dictService.getOne(this._route.snapshot.params.id)
      .then(res => {
        this.dict = res.data || {};
        this.forbidSaveBtn = false;
      });
    } else if ( this.editType === 'add' ) {
      this.dict = this._route.snapshot.queryParams || {};
      this.forbidSaveBtn = false;
    }
  }
  handleSaveBtnClick(values: Object) {
    if ( this.myForm.form.valid ) {
      this._dictService.postOne(values)
      .then(res => {
        console.log(res)
      })
    }
  }
  handleBackBtnClick() {
    this._location.back();
  }
}