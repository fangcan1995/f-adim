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
import {CouponService} from "../../coupon.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
@Component({
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent implements OnInit {

  public coupon: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  constructor(private _couponService: CouponService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          console.log(params.id);
          this._couponService.getOne(params.id)
            .subscribe(res => {
              this.coupon = res.data || {};
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
        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
        }
      })
  }

  handleBackBtnClick() {
    this._location.back()
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if (this._editType === 'edit') {
      requestStream$ = this._couponService.putOne(this.coupon.id, this.coupon)
    } else if (this._editType === 'add') {
      requestStream$ = this._couponService.postOne(this.coupon)
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
          this._router.navigate(['/seer/basic-info/member'])
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
      // ==================模态层=========================
  public modalRef: BsModalRef;
  public open(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  }
  // ======================选着人员页面跳转==================
  choose(){
     this._router.navigate(['operation/coupon/edit']);
  }
}
