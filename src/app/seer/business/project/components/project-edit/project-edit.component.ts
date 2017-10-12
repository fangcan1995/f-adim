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
import {ProjectModel} from "../../ProjectModel"
@Component({
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  public project: any = {};
  private _editType: string = 'edit';
  titlesPawnVehicle= [
    { key:'clpp', label:'车辆品牌' },
    { key:'clxh', label:'车辆型号' },
    { key:'cjh', label:'车架号' },
    { key:'cph', label:'车牌号'},
    { key:'djzh', label:'登记证号' },
    { key:'cl', label:'车龄' },
    { key:'xslc', label:'行驶里程' },
    { key:'pgjg', label:'评估价格' },
  ];
  titlesPawnHouse= [
    { key:'fcdz', label:'房产地址' },
    { key:'jzmj', label:'建筑面积' },
    { key:'aaa', label:'房屋类型' },
    { key:'aaa', label:'房龄'},
    { key:'aaa', label:'尚欠贷余额' },
    { key:'aaa', label:'土地所有证号' },
    { key:'aaa', label:'房屋产权所有证号' },
    { key:'aaa', label:'评估价格' },
  ];
  pawnVehicle: any = [];
  pawnHouse: any = [];
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
              //console.log(res.data);
              this.project = res.data || {};
              this.pawnVehicle=this.project.pawnVehicle;  //抵押物
              this.pawnHouse=this.project.pawnHouse;

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
