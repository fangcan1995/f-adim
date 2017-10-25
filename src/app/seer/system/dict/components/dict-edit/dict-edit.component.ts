import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { CustomValidators } from 'ng2-validation';

import { DictService } from "../../dict.service";
import * as _ from 'lodash';
import { SeerDialogService } from '../../../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './dict-edit.component.html',
  styleUrls: [ './dict-edit.component.scss' ],
})
export class DictEditComponent {
	dict = {};
	constructor() {
	    
	}
}