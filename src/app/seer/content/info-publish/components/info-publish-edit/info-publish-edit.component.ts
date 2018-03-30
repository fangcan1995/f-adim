import { Component, OnInit, OnChanges, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeerMessageService, SeerDialogService } from '../../../../../theme/services';
import { InfoPublishService } from '../../info-publish.service';
import { Location } from '@angular/common';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { getStorage } from '../../../../../theme/libs/utils';
import { BASE_URL } from '../../../../../theme/services/base.service';
import * as _ from 'lodash';

import { GlobalState } from "../../../../../global.state";
import { json2Tree } from "../../../../../theme/libs/json2Tree";
import { TREE_PERMISSIONS } from "../../../../../theme/modules/seer-tree/constants/permissions";
import { TREE_EVENTS } from "../../../../../theme/modules/seer-tree/constants/events";
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";

import { User } from "../../../../model/auth/user";
import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";


@Component({
    templateUrl: './info-publish-edit.component.html',
    styleUrls: ['./info-publish-edit.component.scss']
})

export class InfoPublishEditComponent implements OnInit, OnChanges {
    @Input()
    private disabled: boolean = false;

    @Input()
    private projectId: string;


    @ViewChild('autoShownModal') public autoShownModal: ModalDirective;


    public infoPublishSource: any = {};
    private _editType: string = 'add';
    private uploadDisabled: boolean = false;

    /* 上传图片相关 */
    /*fileApi = 'http://172.16.7.4:8020/notice/affiche';*/
    fileApi = `${BASE_URL}/notice/affiche`;
    token = getStorage({ key: 'token' });
    tokenType = this.token.token_type;
    accessToken = this.token.access_token;
    public attachments = [];
    public uploader: FileUploader; //上传对象
    private progress: number = 0; //上传进度
    form: FormGroup;


    constructor(
        private _infoPublishService: InfoPublishService,
        private _messageService: SeerMessageService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _location: Location,
        private modalService: BsModalService,
        private globalState: GlobalState,
        private _dialog: SeerDialogService
    ) {
        this.globalState.subscribe(this.EVENT, param => {
            this.openModal(param);
        });

        this.form = new FormGroup({
            //
            column: new FormControl('', CustomValidators.required),
            title: new FormControl('', Validators.required),
            //content: new FormControl('', Validators.required),
        });
    }


    /* 模态框相关 */
    public modalRef: BsModalRef;
    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    public hideModal(): void {
        this.autoShownModal.hide();
    }


    //编辑的保存按钮
    public saveButtonState: boolean = true;


    /* 公共变量与缓存 */
    // 栏目树相关
    title = '基本信息';
    treePermissions = TREE_PERMISSIONS.NOTIFY;
    treeNode = [];
    cacheMemory = {};
    newsId;


    EVENT = 'openUserAddedDialog'
    SAVEEVENT = 'saveSysUser';
    EDITEVENT = 'editSysUser';

    /* 初始化渲染 */
    ngOnInit() {
        this.newsId = this._activatedRoute.snapshot.params.id;
        this._activatedRoute.url.mergeMap(url => {
            this._editType = url[0].path;
            return this._activatedRoute.params;
        }).subscribe(result => {
            if (this._editType == 'edit') {
                this._infoPublishService.getArticle(result.id).then(res => {
                    this.infoPublishSource = res.data || {};
                    this.cacheMemory = _.cloneDeep(this.infoPublishSource);
                    this.saveButtonState = false;
                    console.log(this.infoPublishSource);
                    //初始化uploader变量，用来配置input 中的uploader属性
                    let headers = [{ name: 'Authorization', value: `${this.tokenType} ${this.accessToken}` }];
                    this.uploader = new FileUploader({
                        url: `${this.fileApi}/upfile?id=${this.newsId}&fileId=${this.infoPublishSource.fileId}`,
                        method: 'POST',
                        headers: headers
                    });
                    this.uploader.onSuccessItem = this.successItem.bind(this);
                    this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
                }).catch(err => {
                    this.showError(err.msg || '获取失败');
                });
            }
            else if (this._editType == 'add') {
                this.saveButtonState = false;
                // 初始化定义uploader变量,用来配置input中的uploader属性
                let headers = [{ name: 'Authorization', value: `${this.tokenType} ${this.accessToken}` }];
                this.uploader = new FileUploader({
                    url: `${this.fileApi}/file`,
                    method: "POST",
                    headers: headers,
                });
                this.uploader.onSuccessItem = this.successItem.bind(this);
                this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
            }
        });

        this.getColumnTree();
    }

    /* 当注入的信息变化时 */
    ngOnChanges() {

    }

    /* 返回按钮 */
    goBack() {
        this._dialog.confirm('确认放弃本次编辑么？')
            .subscribe(action => {
                if(action === 1) {
                    this._location.back();
                }
            }) ; 
    }

    /* 保存按钮 */
    handleSaveClick() {
        if (this.saveButtonState) return;
        this.saveButtonState = true;

        if (!this.form.valid) {
            this.showError('请按规则填写表单');
            this.saveButtonState = false;
        }
        else if (!this.infoPublishSource.affContent) {
            this.showError('请填写文章内容');
            this.saveButtonState = false;
        }
        else if (!this.infoPublishSource.affTypeName) {
            this.showError('请选择栏目');
            this.saveButtonState = false;
        }
        else {
            if (this._editType === 'edit') {
                this._infoPublishService.editArticle(this.infoPublishSource).then(res => {
                    this.saveButtonState = false;
                    this.showSuccess(res.message || '更新成功').onClose()
                        .subscribe(() => {
                            this._router.navigate(['/content/info-publish/'])
                        });
                }).catch(err => {
                    this.saveButtonState = true;
                    this.showError(err.msg || '更新失败');
                });
            }
            else if (this._editType === 'add') {
                this._infoPublishService.addNewArticle(this.infoPublishSource).then((res: any) => {
                    this.saveButtonState = false;
                    this.showSuccess(res.msg || '保存成功').onClose()
                        .subscribe(() => {
                            this._router.navigate(['/content/info-publish']);
                        });
                }).catch(err => {
                    this.saveButtonState = false;
                    this.showError(err.msg || '保存失败');
                });
            }
            else {
                return;
            }
        }



    }

    /* 获取栏目树的节点 */
    getColumnTree() {
        return this._infoPublishService.getAllColumnTree().then(result => {
            result.data.map(org => org['children'] = []);
            let nodes = json2Tree(result.data, { parentId: 'parentId', children: 'children', id: 'id' }, [{ origin: 'affTypeName', replace: 'name' }]);
            nodes.map(rootNode => rootNode['expanded'] = true);
            this.treeNode = nodes;
        });
    }

    /* 栏目树点选的响应 */
    onTreePick($event) {
        console.log($event);

        if ($event.eventName == TREE_EVENTS.onActivate) {
            console.log($event.node.data);
            if ($event.node.data.isRoot === 2) {
                this.infoPublishSource.typeId = $event.node.data.id;
                this.infoPublishSource.affTypeName = $event.node.data.affTypeName;
            }
            else {
                this.showError('不能选择根栏目，请选择最终子栏目创建文章！').onClose();
            }

        }

    }

    /* 模态框保存按钮，保存当时数据的快照 */
    onSave() {
        this.cacheMemory = _.cloneDeep(this.infoPublishSource);
        console.log(this.cacheMemory);
    }

    /* 模态框取消按钮，恢复最近一次数据的快照 */
    onCancel() {
        console.log(this._editType);
        this.infoPublishSource = this.cacheMemory;
        console.log(this.infoPublishSource);
    }


    /* 上传 */
    uploadFile() {
        _.forEach(this.uploader.queue, (t, i) => {
            this.uploader.queue[i].upload(); // 开始上传
        });
    }

    /* 上传成功回调 */
    successItem(FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        if (status == 200) {
            // 上传文件后获取服务器返回的数据
            let tempRes = JSON.parse(response);
            this.attachments.push(tempRes.data);
            let fileLength = this.uploader.queue.length;
            this.progress += Math.round(100 / fileLength);
            //唯一图片场景下
            let attachmentsNum = this.attachments.length - 1;
            if (!this.attachments[attachmentsNum]) {
                this.showError('上传失败');
            } else {
                this.infoPublishSource.affIcon = this.attachments[attachmentsNum].uploadPath;
                this.infoPublishSource.fileId = this.attachments[attachmentsNum].id;
            }

            //
        } else {
            // 上传文件后获取服务器返回的数据错误
            this.showError("上传失败！")
        }
    }

    /* 全部上传完成回调 */
    onCompleteAll(): any {
        this.uploader.clearQueue();
        this.progress = 0;
    }


    /* 提示框区域 */
    showSuccess(message: string) {
        return this._messageService.open({
            message,
            icon: 'fa fa-check',
            autoHideDuration: 3000,
        })
    }
    showError(message: string) {
        return this._messageService.open({
            message,
            icon: 'fa fa-times-circle',
            autoHideDuration: 3000,
        })
    }
}
