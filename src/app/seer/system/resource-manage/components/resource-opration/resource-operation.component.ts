import {Component, ViewEncapsulation} from "@angular/core";
import {ResourceManageService} from "../../resource-manage.service";
import {Router} from "@angular/router";
@Component({
  selector: 'resource-operation',
  templateUrl: './resource-operation.component.html',
  providers: [ResourceManageService],
  styleUrls: ['./resource-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceOperationComponent{


  resource_id:string;
  resource_name:string;

  resource:any = {};

  constructor(
    private _router: Router,
    private service:ResourceManageService
  ){}

  onSubmit(){
      //alert(this.resource.resource_id);
      //alert(this.resource.resource_name);
  }


  newResource() {
      this._router.navigate(['/seer/system/resource-manage/edit']);
  }

  deleteResource() {
      this._router.navigate(['/seer/system/resource-manage/']);
  }

  searchResource() {

    alert(this.resource.resource_id);
    alert(this.resource.resource_name);

    this._router.navigate(['/seer/system/resource-manage/']);
  }

}
