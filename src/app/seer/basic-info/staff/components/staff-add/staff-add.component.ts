import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute,} from '@angular/router';
import {Location} from '@angular/common';
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';
import {StaffService} from '../../staff.service';
import {titlesEducation, titlesRelation, titlesExperience} from '../../staff.config';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap/modal';
import {jsonTree} from "../../../../../theme/utils/json-tree";
import {UPDATE, DELETE, SAVE} from '../../../../common/seer-table/seer-table.actions';

@Component({
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {

  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  isDimission = false;
  staffId;
  treeNode = [];//组织树

  public staff: any = {
    sysEmployer: {}
  };
  educationsData = [];
  relationsData = [];
  experiencesData = [];

  public titlesEducation = titlesEducation;
  public titlesRelation = titlesRelation;
  public titlesExperience = titlesExperience;

  @ViewChild('educationView') educationView;
  @ViewChild('relationView') relationView;
  @ViewChild('experienceView') experienceView;

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
    // this.getOrganizations();

    this._route.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._route.params
    }).subscribe(params => {
      if (this._editType === 'add') {
        this.forbidSaveBtn = false;
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
    console.log(this.staff.sysEmployer);
    this.timestampFormat();
    this._staffService.putOne(this.staff.sysEmployer.id, this.staff.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        alert("添加成功");
      } else {
        alert("添加失败");
      }
    });
  }

  //职位个人基本信息
  staffInfoNotify() {
    this.timestampFormat();
    this._staffService.putOne(this.staff.sysEmployer.id, this.staff.sysEmployer).then((result) => {
      console.log(this.staff.sysEmployer);
      if (result.code == 0) {
        alert("添加成功");
      } else {
        alert("添加失败");
      }
    });
  }

  /*Date类型转化为时间戳*/
  timestampFormat() {
    if (this.staff.sysEmployer.entryTime != null && this.staff.sysEmployer.entryTime != "") {
      this.staff.sysEmployer.entryTime = this.staff.sysEmployer.entryTime.getTime();
    }
    if (this.staff.sysEmployer.exitTime != null && this.staff.sysEmployer.exitTime != "") {
      this.staff.sysEmployer.exitTime = this.staff.sysEmployer.exitTime.getTime();
    }
    if (this.staff.sysEmployer.contractStartDate != null && this.staff.sysEmployer.contractStartDate != "") {
      this.staff.sysEmployer.contractStartDate = this.staff.sysEmployer.contractStartDate.getTime();
    }
    if (this.staff.sysEmployer.contractEndDate != null && this.staff.sysEmployer.contractEndDate != "") {
      this.staff.sysEmployer.contractEndDate = this.staff.sysEmployer.contractEndDate.getTime();
    }
    if (this.staff.sysEmployer.empBirth != null && this.staff.sysEmployer.empBirth != "") {
      this.staff.sysEmployer.empBirth = this.staff.sysEmployer.empBirth.getTime();
    }
  }

  // /* 获取全部组织机构 */
  // getOrganizations() {
  //   this._staffService.getOrganizations().then((result) => {
  //     result.data.map(org => org['children'] = []);
  //     let nodes = jsonTree(result.data, {parentId: 'orgParentId', children: 'children'}, [{
  //       origin: 'orgName',
  //       replace: 'name'
  //     }]);
  //     console.log(nodes);
  //     this.treeNode = nodes;
  //   });
  // }

  //教育背景
  educationsNotify($event) {
    let {type, key} = $event;
    let editData = this.educationView.getFormatDataByKey(key).editData;
    switch (type) {
      case 'save':
        if (editData.id) {
          this._staffService.putOneEdu(this.staffId, editData).then((result) => {
            this.educationView.save(key);
          });//修改
        } else {
          this._staffService.postOneEdu(this.staffId, editData).then((result) => {
            this.educationView.save(key);
          });//新增
        }
        alert('保存');
        break;
      case 'delete':
        this._staffService.deleteEdu(this.staffId, editData.id).then((result) => {
          this.educationView.delete(key);
        });
        alert('删除');
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
            this.relationView.save(key);
          });//修改
        } else {
          this._staffService.postOneRelations(this.staffId, editData).then((result) => {
            this.relationView.save(key);
          });//新增
        }
        alert('保存');
        break;
      case 'delete':
        this._staffService.deleteRelations(this.staffId, editData.id).then((result) => {
          this.relationView.delete(key);
        });
        alert('删除');
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
            this.experienceView.save(key);
          });//修改
        } else {
          this._staffService.postOneExperiences(this.staffId, editData).then((result) => {
            this.experienceView.save(key);
          });//新增
        }
        alert('保存');
        break;
      case 'delete':
        this._staffService.deleteExperiences(this.staffId, editData.id).then((result) => {
          this.experienceView.delete(key);
        });
        alert('删除');
        break;
    }
  }

  /* 模态层 */
  public modalRef: BsModalRef;

  public openModal(template: TemplateRef<any>) {
    //console.log(template);
    this.modalRef = this.modalService.show(template);
  }

}
