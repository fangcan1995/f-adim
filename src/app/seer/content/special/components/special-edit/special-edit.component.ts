import { Component, OnDestroy, OnInit,AfterViewInit,ViewChild } from "@angular/core";
import { SpecialService } from "../../special.service";
import { SeerMessageService } from "../../../../../theme/services/seer-message.service";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import * as _ from 'lodash';


declare let laydate;

@Component({
    templateUrl: './special-edit.component.html',
    styleUrls: ['./special-edit.component.scss']
})
export class SpecialEditComponent implements OnInit, OnDestroy {

    public special: any = {};
    @ViewChild("seerEditor") seerEditor;
    private _editType: string = 'add';
    public forbidSaveBtn: boolean = true;
    form: FormGroup;
    content: any = '';
    constructor(private service: SpecialService,
        private _messageService: SeerMessageService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _location: Location) {

        this.form = new FormGroup({
            subjectName: new FormControl('', Validators.required),
            subjectType: new FormControl('', Validators.required),
            device: new FormControl('', Validators.required),
        });

    }

    ngOnInit() {
        this._activatedRoute.url.mergeMap(url => {
            this._editType = url[0].path;
            return this._activatedRoute.params
        }).subscribe(params => {
            if (this._editType === 'edit') {
                this.service.getOne(params.id)
                    .then(res => {

                          setTimeout(()=>{
                            this.special = res.data;
                          },800)
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
        });

    }


    handleBackBtnClick() {
        this._location.back()
    }

    handleSaveBtnClick() {
        if (this.form.valid) {
            this.forbidSaveBtn = true;
            if (!this.form.valid) {
                this.alertError('请按规则填写表单');
                this.forbidSaveBtn = false;
            }
            else if (!this.special.content) {
                this.alertError('请填写文章内容');
                this.forbidSaveBtn = false;
            }
            else {
                this.service.putOne(this.special)
                    .then(data => {
                        this.alertSuccess(data.message);
                    }).catch(err => {
                        this.alertError(err.msg);
                    });
            }
        }
    }

    alertSuccess(info: string) {
        this._messageService.open({
            icon: 'fa fa-check',
            message: info,
            autoHideDuration: 3000,
        }).onClose().subscribe(() => {
            this._router.navigate(['/content/special/'])
        });
    };
    alertError(errMsg: string) {
        this.forbidSaveBtn = false;
        // 错误处理的正确打开方式
        this._messageService.open({
            icon: 'fa fa-times-circle',
            message: errMsg,
            autoHideDuration: 3000,
        })
    };



    ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    }

}
