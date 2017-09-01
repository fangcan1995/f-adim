import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { InfoPublishService } from "./info-publish.service";
@Component({
  templateUrl: './info-publish.component.html',
  styleUrls: ['./info-publish.component.scss'],
})
export class InfoPublishComponent {
  title = "栏目列表"
  tableTitle: string = "文章列表";
  constructor() {}
}

