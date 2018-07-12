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
    templateUrl: './invest-statistic.component.html',
    styleUrls: ['./invest-statistic.component.scss'],
})

export class InvestStatisticComponent implements OnInit {

    hasGlobalFilter = true;
    isLoading = false;
    //filterRowLength = 2;

    filters = [
        { key: 'inviteeAccount', label: '项目名称', type: 'input.text' },
        { key: 'inviteeName', label: '投资人账号', type: 'input.text' },
        { key: 'inviterAccount', label: '投资类型', type: 'select' },
        { key: 'inviterName', label: '项目状态', type: 'select' },
        { key: 'inviteeSignTime', label: '投资时间', type: 'datepicker' },
    ];

    investStatisticList = [];

    titles = [
        { key: 'invitee', label: '项目名称' },
        { key: 'inviteeSignTime', label: '项目类型' },
        { key: 'inviteeInvestTime', label: '投资类型' },
        { key: 'inviteeTrueName', label: '借款人' },
        { key: 'inviteeEmail', label: '项目金额（元）' },
        { key: 'inviteePhone', label: '投资金额（元）' },
        { key: 'inviter', label: '投资人' },
        { key: 'inviterTrueName', label: '投资人真实姓名' },
        { key: 'inviteCode', label: '投资人公司备注', hidden: true },
        { key: 'inviteeRemark', label: '投资人手机号码', hidden: true },
        { key: 'inviteeRemark', label: '投资时间', hidden: true },
        { key: 'inviteeRemark', label: '邀请人真实姓名', hidden: true },
        { key: 'inviteeRemark', label: '邀请人公司备注', hidden: true },
        { key: 'inviteeRemark', label: '借款期限', hidden: true },
        { key: 'inviteeRemark', label: '借款利率(%)', hidden: true },
        { key: 'inviteeRemark', label: '项目状态', hidden: true },
        { key: 'inviteeRemark', label: '满标划转时间', hidden: true },
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
            inviteeSignTime: '项目类型',
            inviteeInvestTime: '投资类型',
            inviteeTrueName: '借款人',
            inviteeEmail: '项目金额（元）',
            inviteePhone: '投资金额（元）',
            inviter: '投资人',
            inviterTrueName: '投资人真实姓名',
            inviteCode: '投资人公司备注',
            inviteeRemark: '投资人手机号码',
            inviterRemark: '投资时间',
            /* inviterRemark: '邀请人真实姓名',
            inviterRemark: '邀请人公司备注',
            inviterRemark: '借款期限',
            inviterRemark: '借款利率(%)',
            inviterRemark: '项目状态',
            inviterRemark: '满标划转时间', */
        }
    };

    constructor () {

    }

    ngOnInit () {

    }
}