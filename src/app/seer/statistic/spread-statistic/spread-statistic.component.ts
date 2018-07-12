import {
    Component,
    ViewChild,
    OnDestroy,
    TemplateRef,
    OnInit,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalState } from "../../../global.state";
import {
    SeerDialogService,
    SeerMessageService,
} from '../../../theme/services';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import {
    DynamicComponentLoader
} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as _ from 'lodash';

@Component({
    templateUrl: './spread-statistic.component.html',
    styleUrls: ['./spread-statistic.component.scss'],
})

export class SpreadStatisticComponent implements OnInit {

    hasGlobalFilter = true;
    isLoading = false;
    //filterRowLength = 2;

    filters = [
        { key: 'inviteeAccount', label: '被邀请人账号', type: 'input.text' },
        { key: 'inviteeName', label: '被邀请人姓名', type: 'input.text' },
        { key: 'inviterAccount', label: '邀请人账号', type: 'input.text' },
        { key: 'inviterName', label: '邀请人姓名', type: 'input.text' },
        { key: 'inviteeSignTime', label: '被邀请人注册时间', type: 'datepicker' },
    ];

    spreadStatisticList = [];

    titles = [
        { key: 'invitee', label: '被邀请人' },
        { key: 'inviteeSignTime', label: '被邀请人注册时间' },
        { key: 'inviteeInvestTime', label: '被邀请人投资时间' },
        { key: 'inviteeTrueName', label: '被邀请人真实姓名' },
        { key: 'inviteeEmail', label: '被邀请人邮箱' },
        { key: 'inviteePhone', label: '被邀请人手机号' },
        { key: 'inviter', label: '邀请人' },
        { key: 'inviterTrueName', label: '邀请人真实姓名' },
        { key: 'inviteCode', label: '邀请码', hidden: true },
        { key: 'inviteeRemark', label: '被邀请人公司备注', hidden: true },
        { key: 'inviterRemark', label: '邀请人公司备注', hidden: true },
    ];

    pageInfo = {
        "pageNum": 1,
        "pageSize": 10,
        "globalSearch": '',
        "sortBy": "",
        "total": '',
        "inviteeAccount": '',
        "inviteeName": '',
        "inviterAccount": '',
        "inviterName": '',
        "inviteeSignTime": '',
        excelmaps: {
            invitee: '被邀请人',
            inviteeSignTime: '被邀请人注册时间',
            inviteeInvestTime: '被邀请人投资时间',
            inviteeTrueName: '被邀请人真实姓名',
            inviteeEmail: '被邀请人邮箱',
            inviteePhone: '被邀请人手机号',
            inviter: '邀请人',
            inviterTrueName: '邀请人真实姓名',
            inviteCode: '邀请码',
            inviteeRemark: '被邀请人公司备注',
            inviterRemark: '邀请人公司备注',
        }
    };
    


    constructor() {

    }

    ngOnInit() {

    }
}