import { Component, OnDestroy, OnInit } from "@angular/core";
import { AnnouncementService } from "../../announcement.service";
import { SeerMessageService } from "../../../../../theme/services/seer-message.service";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import * as _ from 'lodash';

@Component({
    templateUrl: './announcement-edit.component.html',
    styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent implements OnInit, OnDestroy {

    public announcement: any = {};
    time = new Date();
    private _editType: string = 'add';
    public forbidSaveBtn: boolean = true;
    form: FormGroup;
    constructor(private _announcementService: AnnouncementService,
        private _messageService: SeerMessageService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _location: Location) {

        this.form = new FormGroup({
            announcementName: new FormControl('', Validators.required),
            announcementTitle: new FormControl('', Validators.required),
        });

    }




    ngOnInit() {
        this._activatedRoute.url.mergeMap(url => {
            this._editType = url[0].path;
            return this._activatedRoute.params
        })
            .subscribe(params => {
                if (this._editType === 'edit') {
                    this._announcementService.getOne(params.id)
                        .then(res => {
                            this.announcement = res.data;
                            //this.announcement.effectTime = new Date(this.announcement.effectTime);
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
    dateChange(event){
        this.announcement.effectTime = event;
    }

    handleBackBtnClick() {
        this._location.back()
    }

    handleSaveBtnClick() {
        if (this.forbidSaveBtn) return;
        this.forbidSaveBtn = true;

        if (!this.form.valid) {
            this.alertError('请按规则填写表单');
            this.forbidSaveBtn = false;
        }
        else if (!this.announcement.content) {
            this.alertError('请填写文章内容');
            this.forbidSaveBtn = false;
        }
        else {
            const newAnnouncement = _.cloneDeep(this.announcement);
            //newAnnouncement.effectTime = formatDate(newAnnouncement.effectTime, 'YYYY-MM-DD hh:mm:ss');
            console.log(this.announcement.effectTime);
            this._announcementService.putOne(newAnnouncement)
                .then(data => {
                    this.alertSuccess(data.message);
                }).catch(err => {
                    console.log(err);
                });
        }



    }

    alertSuccess(info: string) {
        this._messageService.open({
            icon: 'fa fa-check',
            message: info,
            autoHideDuration: 3000,
        }).onClose().subscribe(() => {
            this._router.navigate(['/content/announcement/'])
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
