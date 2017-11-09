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

@Component({
  templateUrl: './target-edit.component.html',
  styleUrls: ['./target-edit.component.scss']
})
export class TargetEditComponent implements OnInit {
  memberActions;
  loanActions;
  forbidSaveBtn: boolean = true;
  constructor(
  ) {}
  ngOnInit() {
  }
}
