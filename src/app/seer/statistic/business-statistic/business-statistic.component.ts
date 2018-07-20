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
    templateUrl: './business-statistic.component.html',
    styleUrls: ['./business-statistic.component.scss'],
})

export class BusiStatisticComponent implements OnInit {

    hasGlobalFilter = true;
    isLoading = false;
    //filterRowLength = 2;

    filters = [
        { key: 'projectName', label: '项目名称', type: 'input.text' },
        { key: 'transferTime', label: '满标划转时间', type: 'datepicker' }
    ];

    flowStatisticList = [];

    titles = [
        { key: 'transferTime', label: '满标日期' },
        { key: 'projectId', label: '项目编号' },
        { key: 'projectName', label: '项目名称' },
        { key: 'projectType', label: '项目类型' },
        { key: 'loanPhone', label: '借款人手机号' },
        { key: 'repayType', label: '还款方式' },
        { key: 'loanLimit', label: '借款期限' },
        { key: 'loanRate', label: '借款利率(%)' },
        { key: 'tradeNum', label: '交易金额', hidden: true },
        { key: 'manageFee', label: '管理费金额', hidden: true },
        { key: 'manageFeeRate', label: '管理费率', hidden: true },
        { key: 'projectState', label: '项目状态', hidden: true },
    ];

    pageInfo = {
        "pageNum": 1,
        "pageSize": 10,
        "globalSearch": '',
        "sortBy": "",
        "total": '',
        "projectName": '',
        "transferTime": '',
        excelmaps: {
            transferTime: '满标日期',
            projectId: '项目编号',
            projectName: '项目名称',
            projectType: '项目类型',
            loanPhone: '借款人手机号',
            repayType: '还款方式',
            loanLimit: '借款期限',
            loanRate: '借款利率(%)',
            tradeNum: '交易金额',
            manageFee: '管理费金额',
            manageFeeRate: '管理费率',
            projectState: '项目状态',
        }
    };

    constructor () {

    }

    ngOnInit () {

    }
}