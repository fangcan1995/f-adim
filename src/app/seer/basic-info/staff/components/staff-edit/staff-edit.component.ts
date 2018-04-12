import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';
import {StaffService} from '../../staff.service';
import {titlesEducation, titlesRelation, titlesExperience} from '../../staff.config';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap/modal';
import {json2Tree} from "../../../../../theme/libs";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import {UPDATE, DELETE, SAVE} from '../../../../common/seer-table/seer-table.actions';

@Component({
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {

  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  isDimission = false;
  staffId;

  treePermissions = TREE_PERMISSIONS.NOTIFY | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = []; //组织树

  public staff: any = {
    sysEmployer: {}
  };
  educationsData = [];
  relationsData = [];
  experiencesData = [];
  educationId;
  relationId;
  experienceId;

  public titlesEducation = titlesEducation;
  public titlesRelation = titlesRelation;
  public titlesExperience = titlesExperience;

  @ViewChild('validationForm') form1;
  @ViewChild('validationForm') form2;
  @ViewChild('educationView') educationView;
  @ViewChild('relationView') relationView;
  @ViewChild('experienceView') experienceView;

  forbidBaseSaveBtn: boolean = false;//传给表单的对象
  collapseCardActions = [SAVE];
  simpleTableActions = [UPDATE, DELETE];

  constructor(private _staffService: StaffService,
              private _messageService: SeerMessageService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getOrganizations();
    this.isDimission=false;
    this.forbidBaseSaveBtn=true;
    this._route.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._route.params
    }).subscribe(params => {
      if (this._editType === 'edit') {
        this.staffId = params.id;
        this._staffService.getOne(params.id).then(res => {
          // console.log(res.data.sysEmployer);
          this.staff = res.data || {};
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
      } else if (this._editType === 'add') {
        this.forbidSaveBtn = false;
      }
    })
  }

  handleBackBtnClick() {
    this._location.back()
    // this._router.navigate(['/basic-info/staff-manage/'])
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
    this.forbidBaseSaveBtn=false;
    this._staffService.putOne(staffinfo.sysEmployer.id, staffinfo.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        this.forbidBaseSaveBtn=true;
        this.alertSuccess(result.message);
      } else {
        this.forbidBaseSaveBtn=true
        this.alertError(result.message);
      }
    });
  }

  //职位个人基本信息
  staffInfoNotify() {
    let staffinfo = _.cloneDeep(this.staff);
    this.timestampFormat(staffinfo);
    this.forbidBaseSaveBtn=false;
    this._staffService.putOne(staffinfo.sysEmployer.id, staffinfo.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        this.alertSuccess(result.message);
        this.forbidBaseSaveBtn=true;
      } else {
        this.alertError(result.message);
        this.forbidBaseSaveBtn=true;
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
    const newData = _.cloneDeep(editData);
    
    switch (type) {
      case 'save':
      newData.endTime = formatDate(newData.endTime, 'YYYY-MM-DD hh:mm:ss');
      let err:string=''
      if(newData.college.length>20){
        err='学历长度不能超过20个字符'
        this.alertError(err)
        return
      }else if(newData.eduMajor.length>10){
        err='所学专业长度不能超过10个字符'
        this.alertError(err)
        return
      }else if(newData.eduLevel.length>10){
        err='学历长度不能超过10个字符'
        this.alertError(err)
        return
      }
        if (editData.id) {          
          this._staffService.putOneEdu(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              
              this.educationView.save(key, newData);
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          }).catch((err)=>{
            this.alertSuccess(err.msg);
          });//修改
        } else {
          this._staffService.postOneEdu(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              this.educationId=result.data;
              
              this.educationView.save(key,newData);
              this.ngOnInit();
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          });//新增
        }
        break;
      case 'delete':
      console.log(this.educationId)
        editData.id=editData.id?editData.id:this.educationId
        this._staffService.deleteEdu(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.educationView.delete(key);
            this.alertSuccess(result.message);
          } else {
            this.alertError(result.message);
          }
        });
        break;
      case 'cancel': 
        console.log(this.educationView)
        this.ngOnInit();
        break;
    }
  }

  //关系人
  relationsNotify($event) {
    let {type, key} = $event;
    let editData = this.relationView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
      console.log(editData)
      let err:string=''
      if(editData.contName.length>6){
        err='姓名长度不能超过6个字符'
        this.alertError(err)
        return
      }else if(editData.contPhone.length>13){
        err='联系电话长度不能超过13个字符'
        this.alertError(err)
        return
      }else if(editData.jobInfo.length>30){
        err='工作单位及职务长度不能超过30个字符'
        this.alertError(err)
        return
      }
        if (editData.id) {
          this._staffService.putOneRelations(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.relationView.save(key);
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          });//修改
        } else {
          this._staffService.postOneRelations(this.staffId, editData).then((result) => {
            if (result.code == 0) {
              this.relationId=result.data
              this.relationView.save(key);
              this.ngOnInit();
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          });//新增
        }
        break;
      case 'delete':
        console.log(editData)
        editData.id=editData.id?editData.id:this.relationId
        this._staffService.deleteRelations(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.relationView.delete(key);
            this.alertSuccess(result.message);
          } else {
            this.alertError(result.message);
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
        console.log(newData);
        let err:string=''
        if(newData.companyName.length>20){
          err='工作单位长度不能超过20个字符'
          this.alertError(err)
          return
        }else if(newData.jobType.length>10){
          err='职务长度不能超过10个字符'
          this.alertError(err)
          return
        }else if(newData.proveName.length>10){
          err='证明人长度不能超过10个字符'
          this.alertError(err)
          return
        }else if(newData.proveTel.length>13){
          err='证明人电话长度不能超过13个字符'
          this.alertError(err)
          return
        }
        if (newData.id) {
          this._staffService.putOneExperiences(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              console.log(key)
              this.experienceView.save(key,newData);
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          });//修改
        } else {
          this._staffService.postOneExperiences(this.staffId, newData).then((result) => {
            if (result.code == 0) {
              this.experienceId=result.data
              this.experienceView.save(key,newData);
              this.ngOnInit();
              this.alertSuccess(result.message);
            } else {
              this.alertError(result.message);
            }
          });//新增
        }
        break;
      case 'delete':
        editData.id=editData.id?editData.id:this.experienceId
        this._staffService.deleteExperiences(this.staffId, editData.id).then((result) => {
          if (result.code == 0) {
            this.experienceView.delete(key);
            this.alertSuccess(result.message);
          } else {
            this.alertError(result.message);
          }
        });
        break;
      case 'cancel': 
        this.ngOnInit();
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
  onNotice ($event) {
    console.log($event);
    let node = $event.node;
    if($event.eventName == "onFocus") {
      this.nodeName = node.data.name;
      this.nodeId = node.data.id;
    }
  }

  save () {
    this.staff.sysEmployer.departmentId = this.nodeId;
    this.staff.sysEmployer.departmentName = this.nodeName;
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa fa-check',
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
