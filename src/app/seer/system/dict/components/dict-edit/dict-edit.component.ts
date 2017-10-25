import {
  Component,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { DictService } from "../../dict.service";
import * as _ from 'lodash';
import { SeerDialogService } from '../../../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './dict-edit.component.html',
  styleUrls: [ './dict-edit.component.scss' ],
})
export class DictEditComponent {

}