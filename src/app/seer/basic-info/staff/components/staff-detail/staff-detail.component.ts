import {Component, OnInit} from "@angular/core";
import {StaffService} from "../../staff.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {titlesEducation, titlesRelation, titlesExperience} from '../../staff.config';

@Component({
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  public staff: any = {
    sysEmployer: {}
  };
  educationsData = [];
  relationsData = [];
  experiencesData = [];

  public titlesEducation = titlesEducation;
  public titlesRelation = titlesRelation;
  public titlesExperience = titlesExperience;

  constructor(private _staffService: StaffService,
              private _messageService: SeerMessageService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location) {
  }

  ngOnInit(): void {
    this._route.url.mergeMap(url => {
      return this._route.params
    }).subscribe(params => {
      this._staffService.getDetailOne(params.id).then(res => {
        // console.log(res.data.sysEmployer);
        this.staff = res.data || {};
        // this.staff.sysEmployer.contractEndDate
        console.log(res)
        this.dateFormat();
        // this.staffStateChange(this.staff.sysEmployer.empStatus);

        this.educationsData = this.staff.sysEduExperList;

        this.relationsData = this.staff.sysEmployContactList;

        this.experiencesData = this.staff.sysWorkExperList;

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
    this._location.back();
  }

  /*时间戳转化为Date*/
  dateFormat() {
    if (this.staff.sysEmployer.entryTime != null && this.staff.sysEmployer.entryTime != "") {
      this.staff.sysEmployer.entryTime = this.formatDate(new Date(this.staff.sysEmployer.entryTime));
    }
    if (this.staff.sysEmployer.exitTime != null && this.staff.sysEmployer.exitTime != "") {
      this.staff.sysEmployer.exitTime = this.formatDate(new Date(this.staff.sysEmployer.exitTime));
    }
    if (this.staff.sysEmployer.contractStartDate != null && this.staff.sysEmployer.contractStartDate != "") {
      this.staff.sysEmployer.contractStartDate = this.formatDate(new Date(this.staff.sysEmployer.contractStartDate));
    }
    if (this.staff.sysEmployer.contractEndDate != null && this.staff.sysEmployer.contractEndDate != "") {
      this.staff.sysEmployer.contractEndDate = this.formatDate(new Date(this.staff.sysEmployer.contractEndDate));
    }
    if (this.staff.sysEmployer.empBirth != null && this.staff.sysEmployer.empBirth != "") {
      this.staff.sysEmployer.empBirth = this.formatDate(new Date(this.staff.sysEmployer.empBirth));
    }
  }

  formatDate(now) {
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    return year + "/" + month + "/" + date;
  }

}
