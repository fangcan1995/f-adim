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
    templateUrl: './flow-statistic.component.html',
    styleUrls: ['./flow-statistic.component.scss'],
})

export class FlowStatisticComponent implements OnInit {

    hasGlobalFilter = true;
    isLoading = false;
    //filterRowLength = 2;

    filters = [
        { key: 'inviteeAccount', label: '付款方姓名', type: 'input.text' },
        { key: 'inviteeName', label: '付款方电话', type: 'input.text' },
        { key: 'inviterAccount', label: '收款方姓名', type: 'input.text' },
        { key: 'inviterName', label: '收款方电话', type: 'input.text' },
        { key: 'inviteeSignTime', label: '交易类型', type: 'select' },
        { key: 'inviteeSignTime', label: '交易时间', type: 'datepicker' },
    ];

    busiStatisticList = [];

    titles = [
        { key: 'invitee', label: '付款方用户名' },
        { key: 'inviteeSignTime', label: '收款方用户名' },
        { key: 'inviteeInvestTime', label: '交易金额' },
        { key: 'inviteeTrueName', label: '交易类型' },
        { key: 'inviteeEmail', label: '交易结果' },
        { key: 'inviteePhone', label: '付款方真实姓名' },
        { key: 'inviter', label: '付款方电话' },
        { key: 'inviterTrueName', label: '收款方真实姓名' },
        { key: 'inviteCode', label: '收款方电话', hidden: true },
        { key: 'inviteeRemark', label: '交易时间', hidden: true },
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
            invitee: '付款方用户名',
            inviteeSignTime: '收款方用户名',
            inviteeInvestTime: '交易金额',
            inviteeTrueName: '交易类型',
            inviteeEmail: '交易结果',
            inviteePhone: '付款方真实姓名',
            inviter: '付款方电话',
            inviterTrueName: '收款方真实姓名',
            inviteCode: '邀请码',
            inviteeRemark: '收款方电话',
            inviterRemark: '交易时间',
        }
    };
    


    constructor() {

    }

    ngOnInit() {

    }
}