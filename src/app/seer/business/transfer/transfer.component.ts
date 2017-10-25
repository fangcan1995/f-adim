import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';

@Component ({
  templateUrl: './transfer.component.html',
})

export class TransferComponent {
  constructor( /*private service: TargetService,*/ private _router: Router, private route: ActivatedRoute) {}
}
