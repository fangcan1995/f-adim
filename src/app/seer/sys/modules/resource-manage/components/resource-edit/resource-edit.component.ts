import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ResourceManageService} from "../../resource-manage.service";
import {ResourceModel} from "../../resource-model.class";




@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  title : string;
  isAdd: boolean;
  editId: string;

  resource:ResourceModel = new ResourceModel();

  constructor(
    private _router: Router,
    private service:ResourceManageService,
    private _activatedRoute:ActivatedRoute
  ) {   }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      // this.isAdd = params['isAdd'];
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })

    this.title = this.isAdd ? '新建资源' : '修改资源';

    if(!this.isAdd) this.getResourceById(this.editId);

  }


  getResourceById(id:string) {
    //alert(id);
    //this.resource.resourceId = id;
    //alert("08");
    this.service.getResourceById(id).then((data) => {
      //console.log(data.success);
      //alert(data.success);
      //alert(data.success);
      this.resource = data.data;
    });
  }


  submitForm() {
    //alert(this.resource.resource_id);
    //alert(this.resource.resource_name);
    if(!this.isAdd){
      this.updateResource();
    }else{
      this.addResource();
    }

  }

  backList() {
    this._router.navigate(['/seer/sys/resource-manage/']);
  }

  updateResource() : void {
    //alert(this.resource.resourceId);
    this.service.updateResource(this.resource).then((data) => {
      console.log(data.success);
      if(data.success) {
        //alert("1")  //新增成功跳转页面
        this._router.navigate(['/seer/sys/resource-manage/']);
      }else{
        //alert("0")
        alert("更新失败~" + data.message);
        this._router.navigate(['/seer/sys/resource-manage/edit',this.resource.resourceId]);
      }
      //console.log(data.data);
    });
  }


  addResource() : void{

    this.service.createResource(this.resource).then((data) => {
      console.log(data.success);

      //alert(data.success);

      if(data.success) {
        //alert("1")  //新增成功 跳转页面
        this._router.navigate(['/seer/sys/resource-manage/']);
      }else{
        alert("添加失败~" + data.message);
        this._router.navigate(['/seer/sys/resource-manage/edit']);
      }

      console.log(data.data);
    });
  }
}
