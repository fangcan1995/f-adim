import {Component, ViewChild, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {Ng2Uploader} from "ng2-uploader";
import {SeerTree} from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TreeNode} from "../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TargetManageService} from "../target-manage.service";
import {jsonTree} from "../../../../../theme/utils/json-tree";
import {Json} from "../../../../login/Json";
import {TREE_EVENTS} from "../../../../../theme/modules/seer-tree/constants/events";
import {SearchTargetDto} from "../SearchTargetDto";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import {BrandTreeComponent} from "./brandTree/brand-tree.component";
import {DynamicComponentLoader} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GlobalState} from "../../../../../global.state";
import {CustomerStoreTreeComponent} from "./customerStoreTree/customer-store-tree.component";
import {BrandTreeDto} from "../BrandTreeDto";
import {StoreTreeDto} from "../StoreTreeDto";


@Component({
  selector: 'TargetComponent',
  templateUrl: './target.Component.html',
  styleUrls: ['./target.component.scss'],
  providers: [Ng2Uploader],
  entryComponents:[BrandTreeComponent,CustomerStoreTreeComponent]

})
export class TargetComponent implements OnInit{
  @ViewChild(SeerTree) seerTree: SeerTree;
  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  loadBrandTree(treeType) {
    this.dynamicComponentLoader.loadComponent(BrandTreeComponent,{target: this.currentTarget,brandTreeDataList: this.brandTreeDataList,treeType: treeType});//把员工id传递给弹出层来比较是否selected
  }
  loadStoreTree(treeType) {
    this.dynamicComponentLoader.loadComponent(CustomerStoreTreeComponent,{target: this.currentTarget,storeTreeDataList: this.storeTreeDataList,treeType: treeType});
  }

  constructor(private _targetManageService :TargetManageService, private _state: GlobalState){
    _state.subscribe('getSuppliers',(data)=>{
      if(data.length>0) {
        this.brandTreeDataList = data;
      }
    });
    _state.subscribe('getStores',(data)=>{
      if(data.length>0){
        this.storeTreeDataList = data;
      }
    })
  }
  ngOnInit(): void {
    this._targetManageService.getOrganizations().subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          if(!v.children){
            v['hasChildren'] = true;
          }
        });
        this.organizations = jsonTree(result.data,{id:'id',parentId:'orgParentId'},[{origin:'orgName',replace:'name'},{origin:'id',replace:'id'}]);

      }else {
        alert(result.message);
      }
    });

  }

  data = [];
  targetDate = [];
  node: TreeNode;
  organizations = [];
  lazyChildren = [];
  errorMessage;
  selectedPermissions = TREE_PERMISSIONS.NOTIFY;
  brandTreeDto: BrandTreeDto;
  storeTreeDto: StoreTreeDto;
  treeType;
  brandTreeDataList = [];
  storeTreeDataList = [];
  title = '组织人员';
  rightTitle = '';
  currentTarget = {
    id : '',
    beginDate : '',
    endDate : '',
    cost : '',
    openUpStoreNum : '',
    receivedPayments : '',
    saleTarget : '',
    relateType : '',
    relateId : '',
    customerStoreId : [],
    brandId:[],
  };

  titles = [
    {
      key:'beginDate',
      label:'开始时间',
      type: 'date',
    },
    {
      key:'endDate',
      label:'结束时间',
      type: 'date',
    },
    {
      key:'cost',
      label:'运营资金',
    },
    {
      key:'saleTarget',
      label:'销售目标',
    },
    {
      key:'receivedPayments',
      label:'回款目标',
    }
  ];

  titleOption =[
    {
      key:'beginDate',
      label:'开始时间',
      type: 'date',
    },
    {
      key:'endDate',
      label:'结束时间',
      type: 'date',
    },
    {
      key:'cost',
      label:'运营资金',
    },
    {
      key:'saleTarget',
      label:'销售目标',
    },
    {
      key:'receivedPayments',
      label:'回款目标',
    },
    {
      key:'openUpStoreNum',
      label:'回款目标',
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
      type: 'date',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
      type: 'date',
    }
  ];

  cancel(){
    this.data = [];
    this.node = null;
    this.currentTarget = {
      id : '',
      beginDate : '',
      endDate : '',
      cost : '',
      openUpStoreNum : '',
      receivedPayments : '',
      saleTarget : '',
      relateType : '',
      relateId : '',
      customerStoreId : [],
      brandId:[],
    };
    this.seerTree.clearHistory();
    this.treeType = '';
    this.brandTreeDataList = [];
    this.storeTreeDataList = [];
  }

  saveTarget(): void{
    this.currentTarget.brandId = this.brandTreeDataList;
    this.currentTarget.customerStoreId = this.storeTreeDataList;
    if(this.currentTarget.id){
      this._targetManageService.updateTarget(this.currentTarget)
        .subscribe(
          res => {
            this.node = null;
            this.data=[];
            this.treeType = '';
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this._targetManageService.addTarget(this.currentTarget)
        .subscribe(
          res => {
            this.node = null;
            this.data=[];
            this.treeType = '';
          },
          error =>  this.errorMessage = <any>error);

    }
  }

  onNotify($event){
    if($event.eventName == TREE_EVENTS.onActivate){
      this.data = this.seerTree.getSelectedNodes(false);
      this.node = this.data[0];
      if(this.node){
        let searchTargetDto = new SearchTargetDto();
        if(this.node.data.orgName){
          this.rightTitle = "设置"+this.node.data.orgName+"目标";
          searchTargetDto.relateDtoType = '00';
          searchTargetDto.relateDtoId = this.node.data.id;
          this._targetManageService.getTargetByTerms(searchTargetDto)
            .subscribe(
              res => {
                if(res.data){
                  this.targetDate = res.data;
                }
              },
              error =>  this.errorMessage = <any>error);
        }else{
          this.rightTitle = "设置"+this.node.data.staffName+"目标";
          searchTargetDto.relateDtoType = '01';
          searchTargetDto.relateDtoId = this.node.data.id;
          console.log(searchTargetDto);
          this._targetManageService.getTargetByTerms(searchTargetDto)
            .subscribe(
              res => {
                if(res.data){
                  this.targetDate = res.data;
                }
              },
              error =>  this.errorMessage = <any>error);
        }
      }
    }else if($event.eventName == TREE_EVENTS.onDeactivate){
      this.data = [];
      this.node = null;
      this.currentTarget = {
        id : '',
        beginDate : '',
        endDate : '',
        cost : '',
        openUpStoreNum : '',
        receivedPayments : '',
        saleTarget : '',
        relateType : '',
        relateId : '',
        customerStoreId : [],
        brandId:[],
      };
    }else if($event.eventName == TREE_EVENTS.onLazyLoadChildren){
      this.lazyChildren = [];
      this.getLazyChildren($event.node);
    }
  }

  onChange(message):void {
    if(message.type=='add'){
      this.treeType = 'add';
      if(this.node.data.orgName){
        this.currentTarget = {
          id : '',
          beginDate : '',
          endDate : '',
          cost : '',
          openUpStoreNum : '',
          receivedPayments : '',
          saleTarget : '',
          relateType : '00',
          relateId :this.node.data.id,
          customerStoreId : [],
          brandId:[],
        };
      }else {
        this.currentTarget = {
          id : '',
          beginDate : '',
          endDate : '',
          cost : '',
          openUpStoreNum : '',
          receivedPayments : '',
          saleTarget : '',
          relateType : '01',
          relateId : this.node.data.id,
          customerStoreId : [],
          brandId:[],
        };
      }
    }

    if(message.type=='update'){
      this.treeType = 'update';
      if(this.node.data.orgName){
        if(message.data){
          this.currentTarget = message.data;
          if(this.currentTarget.beginDate){
            let d = new Date(this.currentTarget.beginDate);
            this.currentTarget.beginDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
          }
          if(this.currentTarget.endDate){
            let d = new Date(this.currentTarget.endDate);
            this.currentTarget.endDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
          }
          this.currentTarget.relateType = '00';
          this.currentTarget.relateId = this.node.data.id;
        }
      }else {
        if(message.data){
          this.currentTarget = message.data;
          if(this.currentTarget.beginDate){
            let d = new Date(this.currentTarget.beginDate);
            this.currentTarget.beginDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
          }
          if(this.currentTarget.endDate){
            let d = new Date(this.currentTarget.endDate);
            this.currentTarget.endDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
          }
          this.currentTarget.relateType = '01';
          this.currentTarget.relateId = this.node.data.id;
        }
      }
    }

    if(message.type=='delete'){
      this._targetManageService.removeTarget(message.data.id)
        .subscribe(
          res => {
            this.data=[];
          },
          error =>  this.errorMessage = <any>error);
    }

    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      this._targetManageService.removeAllSelectedTargets(ids)
        .subscribe(
          res => {
            this.data=[];
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  private getLazyChildren(node: TreeNode) {
    this._targetManageService.getStaffsByStaffOrgId(node.id).subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          v['name'] = v.staffName;
          this.lazyChildren.push(v);
        });
        node.lazyLoadChildren(this.lazyChildren);
      }else {
        alert(result.message);
      }
    });
  }
}


