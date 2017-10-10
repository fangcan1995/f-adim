import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {ProjectService} from "../../project.service"

@Component({
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  public project: any = {};
  private _editType: string = 'edit';
  constructor(
    private projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
      .subscribe(params => {
        if ( this._editType === 'edit' ) {
          //console.log(params.id)
          this.projectService.getOne(params.projectId)
            .subscribe(res => {
              this.project = res.data || {};
              //this.answers=res.data.answers || [];
              //this.answers = _.map(this.answers, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
             // this.forbidSaveBtn = false;
            }, errMsg => {
              // 错误处理的正确打开方式
              alert('error');
            })
        } else if ( this._editType === 'add' ) {
          //this.forbidSaveBtn = false;
        }
      })
  }
}
