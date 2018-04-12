import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute,} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';
import {StaffService} from '../../staff.service';
import {titlesEducation, titlesRelation, titlesExperience} from '../../staff.config';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap/modal';
import {UPDATE, DELETE, SAVE} from '../../../../common/seer-table/seer-table.actions';
import {json2Tree} from "../../../../../theme/libs/json2Tree";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import {SeerDialogService} from "../../../../../theme/services/seer-dialog.service"

@Component({
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {

  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  isDimission = false;
  staffId;

  public staff: any = {
    sysEmployer: {}
  };
  educationsData = [];
  relationsData = [];
  experiencesData = [];
  public titlesEducation = titlesEducation;
  public titlesRelation = titlesRelation;
  public titlesExperience = titlesExperience;
  
  @ViewChild('validationForm') form1;
  @ViewChild('validationForm') form2;
  @ViewChild('educationView') educationView; //学历技能信息表格
  @ViewChild('relationView') relationView; //家庭主要关系表格
  @ViewChild('experienceView') experienceView; //主要工作经历表格

  forbidBaseSaveBtn: boolean = false;//传给表单的对象

  collapseCardActions = _.cloneDeep([SAVE]);
  simpleTableActions = [UPDATE, DELETE];

  treeNode = [];//组织树
  treePermissions = TREE_PERMISSIONS.NOTIFY | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SHOW_ADD_ROOT;

  constructor(private _staffService: StaffService,
              private _messageService: SeerMessageService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService,
              private _dialogService: SeerDialogService) {
  }

  ngOnInit() {
    this.getOrganizations();
    this.forbidBaseSaveBtn=true;
    console.log(this.form1)
    this._route.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._route.params
    }).subscribe(params => {
      if (this._editType === 'add') {
        // this.collapseCardActions[0].name='保存并完善'
        this.forbidBaseSaveBtn = true;
      }
    })
  }

  /* 返回 */
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

  //职位保存基本信息
  jobInfoNotify() {
    let staffinfo = _.cloneDeep(this.staff);
    console.log(staffinfo)
    this.timestampFormat(staffinfo);
    this._staffService.postOne(staffinfo.sysEmployer)
      .then((result) => {
        console.log(this.staff.sysEmployer);
        if (result.code == 0) {
          this.forbidBaseSaveBtn = false;
          this.staffId=result.data
          // this.alertSuccess(result.message);
          this._dialogService.confirm(result.message+'继续完善新增的员工信息？')
          .subscribe(action => {
            if (action === 1) {
              // this.staffManageService.deleteOne(data.id).then((data) => {
              //   if (data.code == '0') {
              //     this.alertSuccess(data.message);
              //     this.getStaffs();
              //   } else {
              //     this.alertError(data.msg);
              //   }
              // });
              this._router.navigate([`/basic-info/staff-manage/edit/${this.staffId}`])
            }else{
              this._location.back()
            }
          });
        } else {
          this.alertError(result.message);
        }
      }).catch(err => {
        console.log(err);
        if(err.code === 406) {
          let message = JSON.parse(err.msg).message;
          this.alertError(message);
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
      this.alertError(err.msg)
    });
  }

  //教育背景
  educationsNotify($event) {
    let {type, key} = $event;
    let editData = this.educationView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
      const newData = _.cloneDeep(editData);
      console.log(newData);
      newData.endTime = formatDate(newData.endTime, 'YYYY-MM-DD hh:mm:ss');
        if (editData.id) {
          this._staffService.putOneEdu(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              this.educationView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneEdu(this.staffId, newData).then((result) => {
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
              this.relationView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneRelations(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.relationView.save(key);
              this.alertSuccess("添加成功");
            } else {
              this.alertError("添加失败");
            }
          });//新增
        }
        break;
      case 'delete':
        this._staffService.deleteRelations(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.relationView.delete(key);
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
      const newData = _.cloneDeep(editData);
      console.log(newData);
      newData.endTime = formatDate(newData.endTime, 'YYYY-MM-DD hh:mm:ss');
      newData.startTime = formatDate(newData.startTime, 'YYYY-MM-DD hh:mm:ss');
        if (editData.id) {
          this._staffService.putOneExperiences(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              this.experienceView.save(key);
              this.alertSuccess("修改成功");
            } else {
              this.alertError("添加失败");
            }
          });//修改
        } else {
          this._staffService.postOneExperiences(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              this.experienceView.save(key);
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
            this.experienceView.delete(key);
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
    //console.log(template);
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
      icon: 'fa fa fa-check',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe((e) => {
      e=this.staffId
      // this._router.navigate([`/basic-info/staff-manage/edit/${e}`])
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

  // handleSaveBtnClick() {
  //   if (this.form1.form.valid) {
  //     this.forbidSaveBtn=false
  //   }
  // }
}
