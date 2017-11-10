import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { SeerDialogService } from '../../services/seer-dialog.service';
@Component({
  selector: 'seer-dialog',
  templateUrl: './seer-dialog.component.html',
  styleUrls: ['./seer-dialog.component.scss'],
})
export class SeerDialogComponent implements OnInit {
  content: any;
  header: any;
  actions: Array<any> = [];
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private service: SeerDialogService) {}
  ngOnInit() {
  	this.service.onChange().subscribe(res => {
  		this.header = res.header;
  		this.content = res.content;
  		this.actions = res.actions || [];
  		if ( res.isShown ) {
  			this.childModal.show();
  		} else {
  			this.childModal.hide();
  		}
  	})
  }
  handleActionsClick(event) {
    this.service.triggerAction(event)
  }

}
