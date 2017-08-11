import {ViewEncapsulation, Component} from "@angular/core";
import {SupplierManageService} from "../../supplier-manage.service";

/**
 * Created by Administrator on 2016/12/26.
 */
@Component({
  selector: 'supplier-add',
  templateUrl: './supplier-add.component.html',
  providers: [SupplierManageService],
  styleUrls: ['./supplier-add.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierAddComponent{
  title = '角色操作';
  constructor(private service:SupplierManageService){}
}
