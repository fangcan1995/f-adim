import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';

@Component ({
  templateUrl: './parameter.component.html',
})

export class ParameterComponent {
  constructor( /*private service: TargetService,*/ private _router: Router, private route: ActivatedRoute) {}
}
