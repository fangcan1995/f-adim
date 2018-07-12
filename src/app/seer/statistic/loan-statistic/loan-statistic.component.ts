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
    templateUrl: './loan-statistic.component.html',
    styleUrls: ['./loan-statistic.component.scss'],
})

export class LoanStatisticComponent implements OnInit {

    hasGlobalFilter = true;
    isLoading = false;
    //filterRowLength = 2;

    filters = [
        { key: 'inviteeAccount', label: '项目名称', type: 'input.text' },
        { key: 'inviteeName', label: '标的状态', type: 'select' },
        { key: 'inviterAccount', label: '用户账号', type: 'input.text' },
        { key: 'inviterName', label: '新手标标记', type: 'select' },
    ];

    loanStatisticList = [];

    titles = [
        { key: 'invitee', label: '项目名称' },
        { key: 'inviteeSignTime', label: '借款期限' },
        { key: 'inviteeInvestTime', label: '借款利率(%)' },
        { key: 'inviteeTrueName', label: '借款金额（元）' },
        { key: 'inviteeEmail', label: '还款金额（元）' },
        { key: 'inviteePhone', label: '未还款金额（元）' },
        { key: 'inviter', label: '还款方式' },
        { key: 'inviterTrueName', label: '借款时间' },
        { key: 'inviteCode', label: '满标划转时间', hidden: true },
        { key: 'inviteeRemark', label: '借款类型', hidden: true },
        { key: 'inviteeRemark', label: '标状态', hidden: true },
        { key: 'inviteeRemark', label: '借款用途', hidden: true },
        { key: 'inviteeRemark', label: '用户名', hidden: true },
        { key: 'inviteeRemark', label: '真实姓名', hidden: true },
        { key: 'inviteeRemark', label: '证件号码', hidden: true },
        { key: 'inviteeRemark', label: '是否新手标', hidden: true },
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
            invitee: '项目名称',
            inviteeSignTime: '借款期限',
            inviteeInvestTime: '借款利率(%)',
            inviteeTrueName: '借款金额（元）',
            inviteeEmail: '还款金额（元）',
            inviteePhone: '未还款金额（元）',
            inviter: '还款方式',
            inviterTrueName: '借款时间',
            inviteCode: '满标划转时间',
            inviteeRemark: '借款类型',
            inviterRemark: '标状态',
            /* inviterRemark: '借款用途',
            inviterRemark: '用户名',
            inviterRemark: '真实姓名',
            inviterRemark: '证件号码(%)',
            inviterRemark: '是否新手标', */
        }
    };

    constructor () {

    }

    ngOnInit () {

    }
}