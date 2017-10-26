import {Component, ViewEncapsulation} from "@angular/core";
/*import {messageTplManageService} from "./message-template.service";*/
import {Router,ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../model/auth/message-template";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service'
import {UPDATE, DELETE,PREVIEW} from "../../common/seer-table/seer-table.actions"
import * as _ from 'lodash';


@Component({
  selector: 'message-record',
  templateUrl: './message-record.component.html',
  /*providers: [messageTplManageService],*/
  encapsulation: ViewEncapsulation.None
})


export class MessageRecordComponent {

  constructor(
    /*protected service: messageTplManageService,*/
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService
  ) {}

}
