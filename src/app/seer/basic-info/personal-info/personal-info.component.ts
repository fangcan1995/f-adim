import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {SeerDialogService} from '../../../theme/services/seer-dialog.service';
import {UPDATE, DELETE, SAVE} from '../../common/seer-table/seer-table.actions';
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import {PersonalInfoService} from "./personal-info.service";
import {StaffService} from "../staff/staff.service";
import {TREE_PERMISSIONS} from "../../../theme/modules/seer-tree/constants/permissions";
import {titlesEducation, titlesRelation, titlesExperience} from '../staff/staff.config';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {json2Tree} from "../../../theme/libs/json2Tree";

@Component({
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  public forbidSaveBtn: boolean = true;
  isDimission = false;
  staffId;

  treePermissions = TREE_PERMISSIONS.NOTIFY | TREE_PERMISSIONS.ADD | TREE_PERMISSIONS.EDIT | TREE_PERMISSIONS.DELETE | TREE_PERMISSIONS.DRAG | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = []; //组织树

  staff: any = {
    sysEmployer: {}
  };
  educationsData = [];
  relationsData = [];
  experiencesData = [];
  user: any = {};
  role: any = {};


  public titlesEducation = titlesEducation;
  public titlesRelation = titlesRelation;
  public titlesExperience = titlesExperience;

  @ViewChild('educationView') educationView;
  @ViewChild('relationView') relationView;
  @ViewChild('experienceView') experienceView;

  collapseCardActions = [SAVE];
  simpleTableActions = [UPDATE, DELETE];

  constructor(private _personalInfoService: PersonalInfoService,
              private _staffService: StaffService,
              private modalService: BsModalService,
              private _messageService: SeerMessageService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _location: Location,
              private _dialogService: SeerDialogService,) {
  }

  ngOnInit() {
    this.getOrganizations();
    this.isDimission = false;
    this._route.url.mergeMap(url => {
      return this._route.params
    }).subscribe(params => {
      this._personalInfoService.getOne(params.id).then(res => {
        // console.log(res.data.sysEmployer);
        this.staff = res.data.staffInfo || {};
        this.staffId = this.staff.sysEmployer.id;
        this.user = res.data.userInfo || {};
        let roleString = "";
        let length = this.user.roles.length - 1;
        this.user.roles.forEach(function (item, idx) {
          if (idx == length) {
            roleString += item.roleName;
            return;
          }
          roleString += item.roleName + "、";
        });
        this.role = roleString;

        this.dateFormat();
        this.staffStateChange(this.staff.sysEmployer.empStatus);

        this.educationsData = this.staff.sysEduExperList;
        this.educationsData = _.map(this.educationsData, r => _.set(r, 'actions', [UPDATE, DELETE]));

        this.relationsData = this.staff.sysEmployContactList;
        this.relationsData = _.map(this.relationsData, r => _.set(r, 'actions', [UPDATE, DELETE]));

        this.experiencesData = this.staff.sysWorkExperList;
        this.experiencesData = _.map(this.experiencesData, r => _.set(r, 'actions', [UPDATE, DELETE]));

        this.forbidSaveBtn = false;
      }, errMsg => {
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        }).onClose().subscribe(() => {
          this._location.back()
        })
      })
    })
  }

  handleBackBtnClick() {
    this._location.back()
  }

  /*离职处理,员工状态选中离职后，激活离职时间按钮*/
  staffStateChange(staffStateId: any) {
    if (staffStateId == '2') {
      this.isDimission = true;
    } else {
      this.isDimission = false;
    }
  }

  /* 获取全部组织机构 */
  getOrganizations() {
    this._staffService.getOrganizations().then((result) => {
      console.log(result);
      let nodes = json2Tree(result.data,
        {parentId: 'pid', children: 'children', id: 'departmentId'},
        [
          {origin: 'departmentName', replace: 'name'},
          {origin: 'departmentId', replace: 'id'}
        ]
      );

      function addIcon(param) {
        param.map(org => {
          if (org.children) {
            org.customIcon = 'ion-ios-people';
            addIcon(org.children);
          }
          else {
            org.customIcon = 'ion-android-people';
            org.children = [];
          }
        })
      }

      addIcon(nodes);
      nodes.map(rootNode => rootNode['expanded'] = true);
      this.treeNode = nodes;
      console.log(this.treeNode);
    }).catch(err => {
      console.log(err);
    });
  }

  //职位保存基本信息
  jobInfoNotify() {
    let staffinfo = _.cloneDeep(this.staff);
    this.timestampFormat(staffinfo);
    this._staffService.putOne(staffinfo.sysEmployer.id, staffinfo.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        this.alertSuccess("添加成功");
      } else {
        this.alertError("添加失败");
      }
    });
  }

  //职位个人基本信息
  staffInfoNotify() {
    let staffinfo = _.cloneDeep(this.staff);
    this.timestampFormat(staffinfo);
    this._staffService.putOne(staffinfo.sysEmployer.id, staffinfo.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        this.alertSuccess("添加成功");
      } else {
        this.alertError("添加失败");
      }
    });
  }

  /*Date类型转化为时间戳*/
  timestampFormat(data) {
    if (data.sysEmployer.entryTime != null && data.sysEmployer.entryTime != "") {
      data.sysEmployer.entryTime = data.sysEmployer.entryTime.getTime();
    }
    if (data.sysEmployer.exitTime != null && data.sysEmployer.exitTime != "") {
      data.sysEmployer.exitTime = data.sysEmployer.exitTime.getTime();
    }
    if (data.sysEmployer.contractStartDate != null && data.sysEmployer.contractStartDate != "") {
      data.sysEmployer.contractStartDate = data.sysEmployer.contractStartDate.getTime();
    }
    if (data.sysEmployer.contractEndDate != null && data.sysEmployer.contractEndDate != "") {
      data.sysEmployer.contractEndDate = data.sysEmployer.contractEndDate.getTime();
    }
    if (data.sysEmployer.empBirth != null && data.sysEmployer.empBirth != "") {
      data.sysEmployer.empBirth = data.sysEmployer.empBirth.getTime();
    }
  }

  /*时间戳转化为Date*/
  dateFormat() {
    if (this.staff.sysEmployer.entryTime != null && this.staff.sysEmployer.entryTime != "") {
      this.staff.sysEmployer.entryTime = new Date(this.staff.sysEmployer.entryTime);
    }
    if (this.staff.sysEmployer.exitTime != null && this.staff.sysEmployer.exitTime != "") {
      this.staff.sysEmployer.exitTime = new Date(this.staff.sysEmployer.exitTime);
    }
    if (this.staff.sysEmployer.contractStartDate != null && this.staff.sysEmployer.contractStartDate != "") {
      this.staff.sysEmployer.contractStartDate = new Date(this.staff.sysEmployer.contractStartDate);
    }
    if (this.staff.sysEmployer.contractEndDate != null && this.staff.sysEmployer.contractEndDate != "") {
      this.staff.sysEmployer.contractEndDate = new Date(this.staff.sysEmployer.contractEndDate);
    }
    if (this.staff.sysEmployer.empBirth != null && this.staff.sysEmployer.empBirth != "") {
      this.staff.sysEmployer.empBirth = new Date(this.staff.sysEmployer.empBirth);
    }
  }

  //教育背景
  educationsNotify($event) {
    let {type, key} = $event;
    let editData = this.educationView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
        if (editData.id) {
          this._staffService.putOneEdu(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneEdu(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("添加成功");
            } else {
              this.alertError("添加失败");
            }
          });//新增
        }
        break;
      case 'delete':
        this._staffService.deleteEdu(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.educationView.delete(key);
            this.alertSuccess("删除成功");
          } else {
            this.alertError("删除失败");
          }
        });
        break;
    }
  }

  //关系人
  relationsNotify($event) {
    let {type, key} = $event;
    let editData = this.relationView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
        if (editData.id) {
          this._staffService.putOneRelations(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneRelations(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("添加成功");
            } else {
              this.alertError("添加失败");
            }
          });//新增
        }
        alert('保存');
        break;
      case 'delete':
        this._staffService.deleteRelations(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.educationView.delete(key);
            this.alertSuccess("删除成功");
          } else {
            this.alertError("删除失败");
          }
        });
        break;
    }
  }

  //工作经验
  experiencesNotify($event) {
    let {type, key} = $event;
    let editData = this.experienceView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
        if (editData.id) {
          this._staffService.putOneExperiences(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneExperiences(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("添加成功");
            } else {
              this.alertError("添加失败");
            }
          });//新增
        }
        break;
      case 'delete':
        this._staffService.deleteExperiences(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.educationView.delete(key);
            this.alertSuccess("删除成功");
          } else {
            this.alertError("删除失败");
          }
        });
        break;
    }
  }

  /* 模态层 */
  public modalRef: BsModalRef;

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private nodeId: string;
  private nodeName: string;

  onNotice($event) {
    console.log($event);
    let node = $event.node;
    if ($event.eventName == "onFocus") {
      this.nodeName = node.data.name;
      this.nodeId = node.data.id;
    }
  }

  save() {
    this.staff.sysEmployer.departmentId = this.nodeId;
    this.staff.sysEmployer.departmentName = this.nodeName;
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      // this._router.navigate(['/basic-info/staff-manage/'])
    });
  }

  alertError(errMsg: string) {
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }

}

