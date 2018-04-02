import { Component, OnDestroy, OnInit } from "@angular/core";
import { AnnouncementService } from "./announcement.service";
import { SeerDialogService } from "../../../theme/services/seer-dialog.service";
import { UPDATE, DELETE, ENABLE, DISABLE } from "../../common/seer-table/seer-table.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import * as _ from 'lodash';

@Component({
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, OnDestroy {

    hasGlobalFilter = true;
    filters = [
        { key: 'announceName', label: '公告名称', type: 'input.text' },
        { key: 'announceTitle', label: '公告标题', type: 'input.text' },
        {
            key: 'effectTime',
            label: '生效时间',
            groups: [
                {
                    type: 'datepicker',
                },
                {
                    type: 'datepicker',
                },
            ],
            groupSpaces: ['至']
        }
    ];

    announcements = [];
    titles = [
        { key: 'noticeName', label: '公告名称' },
        { key: 'title', label: '公告标题' },
        { key: 'effectTime', label: '生效时间', type: 'date' },
        { key: 'updateTime', label: '最后修改时间', type: 'date' },
        { key: 'updateUser', label: '最后修改人' },
    ];


    pageInfo = {
        "pageNum": 1,
        "pageSize": 10,
        "globalSearch": '',
        "sortBy": "",
        "noticeName": '',
        "title": '',
        "effectTimeStart": '',
        "effectTimeEnd": '',
        "total": ''
    };

    constructor(private _announcementService: AnnouncementService, private _dialogService: SeerDialogService,
        private _router: Router, private _activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.getList(this.pageInfo);
    }


    getList(params?) {
        this._announcementService.getList(params)
            .then(res => {
                this.pageInfo.pageNum = res.data.pageNum;
                this.pageInfo.pageSize = res.data.pageSize;
                this.pageInfo.total = res.data.total;
                this.announcements = res.data.list;
                this.announcements = _.map(this.announcements, t => {
                    let status = t.delFlag;
                    let actions;
                    switch (status) {
                        case 0:
                            actions = [UPDATE, DELETE];
                            break;
                    }
                    return _.set(t, 'actions', actions);
                })
            })
    }

    onChange(message) {
        console.log(message);
        const type = message.type;
        let data = message.data;
        switch (type) {
            case 'create':
                this._router.navigate(['add'], { relativeTo: this._activatedRoute });
                break;
            case 'update':
                this._router.navigate([`edit/${message.data.id}`], { relativeTo: this._activatedRoute });
                break;
            case 'delete':
                this._dialogService.confirm('确定删除吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._announcementService.deleteOne(data.id)
                                .then(data => {
                                    this.getList(this.pageInfo);
                                });
                        }
                    });

                break;
            case 'delete_multiple':
                let ids = _(data).map(t => t.id).value();
                this._dialogService.confirm('确定删除么？')
                    .subscribe(action => {
                        if (action === 1) {
                            ids.map(id => {
                                this._announcementService.deleteOne(id)
                                    .then(data => {
                                        this.getList(this.pageInfo);
                                    })
                            })
                        }
                    });
                break;
            case 'export':
                console.log(this.pageInfo);
                for (let p in this.pageInfo) {
                    console.log(`${p}:${this.pageInfo[p]}`);
                    /* if(this.pageInfo[p] == '' || undefined || null) {
                      delete this.pageInfo[p];
                      console.log(1);
                    } */

                }
                console.log(this.pageInfo);
                this._announcementService.exportForm(this.pageInfo).then(res => {
                    let blob = res.blob();
                    let a = document.createElement('a');
                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = '公告管理' + '.xls';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
                break;
        }
    }

    handleFiltersChanged($event) {
        console.log($event);
        this.pageInfo.globalSearch = $event.globalSearch;
        this.pageInfo.noticeName = $event.announceName;
        this.pageInfo.title = $event.announceTitle;
        if (_.isArray($event.effectTime)) {
            this.pageInfo.effectTimeStart = $event.effectTime[0] ? (formatDate($event.effectTime[0], 'YYYY-MM-DD hh:mm:ss')) : '';
            this.pageInfo.effectTimeEnd = $event.effectTime[1] ? (formatDate($event.effectTime[1], 'YYYY-MM-DD hh:mm:ss')) : '';
        }
        this.getList(this.pageInfo);
    }

    handleSearchBtnClicked($event) {
        this.pageInfo.globalSearch = $event.globalSearch;
        this.pageInfo.noticeName = $event.announceName;
        this.pageInfo.title = $event.announceTitle;
        if (_.isArray($event.effectTime)) {
            this.pageInfo.effectTimeStart = $event.effectTime[0] ? (formatDate($event.effectTime[0], 'YYYY-MM-DD hh:mm:ss')) : '';
            this.pageInfo.effectTimeEnd = $event.effectTime[1] ? (formatDate($event.effectTime[1], 'YYYY-MM-DD hh:mm:ss')) : '';
        }
        console.log(this.pageInfo);
        this.getList(this.pageInfo);
    }


    /* 切换页面 */
    handleChangePage($event) {
        this.pageInfo.pageSize = $event.pageSize;
        this.pageInfo.pageNum = $event.pageNum;
        this.getList(this.pageInfo);
    }

    ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    }

}
