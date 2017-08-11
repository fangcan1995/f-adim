import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {alertService} from "../alert-manage.service";
import {ALERT_TRANSLATE} from "./alert.translate";

import {DictManageService} from "../../dict-manage/dict-manage.service";
import {SeerTree} from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import {RoleManageService} from "../../role-manage/role-manage.service";
import {ModalDirective} from "ng2-bootstrap";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';




@Component({
  selector: 'alertComponent',
  templateUrl: './alertComponent.html',
  styleUrls: ['./alert.component.css'],
  providers: [DictManageService, RoleManageService],

})
export class alertComponent {
  @ViewChild(SeerTree) seerTree: SeerTree;
  @ViewChild('childModal') public childModal: ModalDirective;
  alert_translate = ALERT_TRANSLATE;
  alerts = [];
  currentAlert;
  permission = TREE_PERMISSIONS.NOTIFY;
  showerror = false;
  private myOptions: IMultiSelectOption[] = [];
  titles = [
    {
      key: 'remindName',
      label: '计划名称',
    },
    {
      key: 'remindType',
      label: '提醒方式',
      isDict: true,
    },
    {
      key: 'remindContent',
      label: '提醒内容',
    },
    {
      key: 'remindCondition',
      label: '提醒条件',
      isDict: true,
    },
    /*    {
     key:'remindObject',
     label:'提醒对象',
     },*/
  ];

  action;
  errorMessage;
  nodes = [
    {
      "id": "01",
      "name": "合同",
      "children": []
    },
    {
      "id": "02",
      "name": "商品",
      "children": []
    },
  ];
  currentAlertConfig;
  public selectedOptions = [];
  constructor(private alertService: alertService, private dictManageService: DictManageService, private roleManageService: RoleManageService) {
  }

  roles = [];
  roletitles = [
    {key: 'roleName', label: '角色名称'},
    {key: 'validState', label: '有效状态', isDict: true},
    {key: 'operateTime', label: '修改时间'},
    {key: 'operator', label: '修改者'},
    {key: 'createTime', label: '创建时间'},
    {key: 'createUser', label: '创建者'},
  ];

  getAllRoles() {
    this.roleManageService.getRoles().then((data) => {
      this.roles = data.data;
      let myOptions = [];
      if(this.roles.length){
        this.roles.forEach(function(role){
          myOptions.push({id: role.roleId, name: role.roleName});
        })
      }
      this.myOptions = myOptions;
    });
  }

  ngOnInit() {
    //this.getAlers();
    this.getAllRoles();
    this.dictManageService.getDictByKeyId('CONTRACT_TYPE').subscribe(
      res => {
        if (res.data.length) {
          res.data.forEach(function (item) {
            item.parentId = '01';
            item.name = item.dictValueName;
            item.id = item.dictId;
            item.click = true;
          });
          this.nodes[0].children = res.data;
        }
        this.seerTree.reload(this.nodes);
      },
      error => this.errorMessage = <any>error);
    this.dictManageService.getDictByKeyId('GOODS_TYPE').subscribe(
      res => {
        if (res.data.length) {
          res.data.forEach(function (item) {
            item.parentId = '02';
            item.name = item.dictValueName;
            item.id = item.dictId;
            item.click = true;
          });
          this.nodes[1].children = res.data;
          this.seerTree.reload(this.nodes);
        }
      },
      error => this.errorMessage = <any>error);
  }

  currentEvent ;
  getAlertConfigFunction(){
    this.alerts = [];
    this.roles.forEach(function(role){
      delete role.selected;
    });
    //this.currentAlertConfig = false;
    this.alertService.getAlertConfig({
      remindObjectType: this.currentEvent.node.data.parentId,
      remindObjectId: this.currentEvent.node.data.id,
    }).subscribe(
      res => {
        if (res.data.length) {
          this.currentAlertConfig = res.data[0];
          //console.log(res.data[0].remindPlanIds)
          this.getAlers(res.data[0].remindPlanIds);

    /*      let roles = this.roles;
          this.currentAlertConfig.remindRoleIds.forEach(function(id){
            roles.forEach(function(role){
              if(role.roleId==id){
                role.selected = true;
              }
            })
          });*/
          //this.roles = roles;
        } else {
          this.currentAlertConfig = {
            remindObjectType: this.currentEvent.node.data.parentId,
            remindObjectId: this.currentEvent.node.data.id,
            remindRoleIds: [],
            remindPlanIds: [],
          }
        }
      },
      error => this.errorMessage = <any>error);
  }

  onNotify(event) {
    if (event.eventName == "onActivate") {
      if (event.node && event.node.data && event.node.data.click) {
        this.currentEvent = event;
        if(this.currentAlertConfig){
          //this.saveAlertConfig();
          this.getAlertConfigFunction();
          //this.action = false;
        }else{
          this.getAlertConfigFunction();
        }


      }
    }
  }

  getAlers(ids): void {
    this.alertService.getAlertsByIds(ids)
      .subscribe(
        res => {
          //console.log(res.data)
          this.alerts = res.data;
        },
        error => this.errorMessage = <any>error);
  }


  remindConditionChanged() {
    if (this.currentAlert.remindCondition == '03' || this.currentAlert.remindCondition == '04') {
      this.currentAlert.spaceTime = '';
    }
  }


  alertonChange(message): void {

    if (message.type == 'add') {
      this.showChildModal();
      this.showerror = false;
      this.currentAlert = {
        remindCondition: '',
        remindType: '',
        remindRoleIds:[]
      };
    }
    if (message.type == 'update') {
      this.alertService.getAlertsByIds([message.data.remindId])
        .subscribe(
          res => {
            this.currentAlert = {remindRoleIds:[]};
            this.showChildModal();
            this.showerror = false;
            this.currentAlert = res.data[0];
          },
          error => this.errorMessage = <any>error);
    }
    if (message.type == 'delete') {
      console.log(message.data.remindId)
      this.alertService.removeAlert(message.data.remindId)
        .subscribe(
          res => {
            let i ;
            this.currentAlertConfig.remindPlanIds.forEach(function(id,index){
              if(id==message.data.remindId){
                i = index;
              }
            });
            if(i||i==0){
              this.currentAlertConfig.remindPlanIds.splice(i,1);
            }
            this.getAlers(this.currentAlertConfig.remindPlanIds);
          },
          error => this.errorMessage = <any>error);
    }
  }

  cancel(): void {
    this.currentAlert = false;
    //this.getAlers();
    this.hideChildModal();
  }

  saveAlert(): void {
    if (this.currentAlert.remindId) {
      this.alertService.updateAlert(this.currentAlert)
        .subscribe(
          res => {
            this.currentAlert = false;
            this.getAlers(this.currentAlertConfig.remindPlanIds);
            this.saveAlertConfig();
          },
          error => this.errorMessage = <any>error);
    } else {
      this.alertService.addAlert(this.currentAlert)
        .subscribe(
          res => {
            this.currentAlertConfig.remindPlanIds.push(res.data);
            this.currentAlert = false;
            this.getAlers(this.currentAlertConfig.remindPlanIds);
            this.saveAlertConfig();
          },
          error => this.errorMessage = <any>error);
    }
    this.hideChildModal();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public showChildModal(): void {
    this.childModal.show();
  }




  saveAlertConfig(){
    this.alertService.addAlertConfig(this.currentAlertConfig)
      .subscribe(
        res => {
          //console.log(res.data)
        },
        error => this.errorMessage = <any>error);
  }


  onChangeColonne(event): void {
    //console.log(event)
  }


/*  printcontent = '<div class="alert alert-info">"东汉末年，朝纲混乱，天下群雄争霸，战乱不休。最终中国大陆被曹操（陈建斌饰）、' +
    '刘备（于和伟饰）、孙权（张博饰）三分天下。东汉建安二十一年，公元216年，曹操在邺城即位为魏王，' +
    '国号魏，是为魏国。公元220年，曹操其长子曹丕正式在许昌登基为大魏皇帝。公元221年，' +
    '刘备在成都登基为大汉皇帝，国号汉，改元章武，是为蜀国。公元229年，孙权在武昌登基为皇帝，' +
    '国号吴，改元黄龙，是为吴国。自此，魏、蜀、吴三国鼎立，三分天下——本电视剧所描写之中华历史上知名的“三国时代”，于焉揭幕。</div>';

  contentNotify(event){
    this.printcontent = event.data;
  }*/

}

