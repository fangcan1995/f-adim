import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {Ng2Uploader} from "ng2-uploader";
import {BaseModalComponent} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../../../theme/components/ng2-bs4-modal/modal";
import {AllocationRepertoryCheckService} from "../../allocation-repertory-check.service";
import {UpdateAllocationRepertorysDto} from "../../UpdateAllocationRepertorysDto";
import {GlobalState} from "../../../../../../../../global.state";
import {TREE_PERMISSIONS} from "../../../../../../../../theme/modules/seer-tree/constants/permissions";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {TREE_EVENTS} from "../../../../../../../../theme/modules/seer-tree/constants/events";

@Component({
  selector: 'moveRepertory',
  templateUrl: './move-repertory.component.html',
  styleUrls: ['./move-repertory.component.scss'],
  providers: [Ng2Uploader],

})
export class MoveRepertoryComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private _repertoryCheckService? :AllocationRepertoryCheckService,private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {
    this.goodsData = this.data.goods;
    this.getStorages();
  }

  title = '移仓列表';
  cognateStorages;
  goodsData = [];
  errorMessage;
  updateSuccess: boolean;
  //树相关参数
  treeTitle = "库房列表";
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.SHOW_FILTER;
  treeNode = [];

  titles = [
    {
      key:'goodsName',
      label:'商品名称',
    },
    {
      key:'goodsNumber',
      label:'商品编号',
      type: 'link',
    },
    {
      key:'goodsNum',
      label:'数量(个)',
    }
  ];
  //
  // removeCurrentRole(){
  //   this.cognateStorages = null;
  //   this.storagesData = [];
  //   this.getStorages();
  //   this.currentRole = {roleName:'请选择'};
  //   this.roleData.push(this.currentRole);
  // }

  getStorages(): void{
    this._repertoryCheckService.getAllStorages()
      .subscribe(
      res => {
        let nodes = jsonTree(res.data,{parentId:'parentId',children:'children'},[{origin:'storageName',replace:'name'}]);
        //nodes.map(rootNode=>rootNode['expanded']=true);
        this.treeNode = nodes;
      },
      error =>  this.errorMessage = <any>error)
  }

  onNotify($event):void {

    /* 根据库房id查询库房*/
    if ($event.eventName==TREE_EVENTS.onActivate){
      this.getStoragesById($event.node.id);
    }

  }

  getStoragesById(storageId):void {
    this._repertoryCheckService.getStoragesById(storageId) .subscribe(
      res => {
        this.cognateStorages = res.data;
      },
      error =>  this.errorMessage = <any>error)
  }

  updateSelectedRepertorys(): void {
    let updateAllocationRepertorysDto = new UpdateAllocationRepertorysDto;
    updateAllocationRepertorysDto.storage = this.cognateStorages;
    updateAllocationRepertorysDto.repertoryCheckDtoList = this.goodsData;
    this._repertoryCheckService.updateSelectedRepertorys(updateAllocationRepertorysDto)
      .subscribe(
        res => {
          this.updateSuccess = res.success;
          this.gs.notify('getRepertorys',this.updateSuccess);
          this.updateSuccess = null;
        },
        error =>  this.errorMessage = <any>error);
    this.closeModal();
  }

}


