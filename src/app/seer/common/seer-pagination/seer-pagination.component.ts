import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
@Component({
  selector: 'seer-pagination',
  templateUrl: './seer-pagination.component.html',
  styleUrls: ['./seer-pagination.component.scss'],
})
export class SeerPaginationComponent {
	@Input() rowsOnPageSet = [10, 15, 30];
	@Input() rowsOnPage = 10;
	@Input() rowCount = 0;
	@Input() pageNumber = 1;
	@Output() notify = new EventEmitter();
	constructor() { }
	getPageCount() {
		return Math.ceil(this.rowCount / this.rowsOnPage);
	}
	getPageNumber() {
		return this._getCurrentPageNumber(this.pageNumber);
	}
	setPageNumber(pn) {
		this.pageNumber = this._getCurrentPageNumber(pn);
		this.notify.emit({
			pageNumber: this.getPageNumber(),
			rowsOnPage: this.rowsOnPage,
		})
	}

	setRowsOnPage($event) {
		const rop = +$event.target.value;
		this.rowsOnPage = rop;
		this.notify.emit({
			pageNumber: this.getPageNumber(),
			rowsOnPage: this.rowsOnPage,
		})
	}
	private _getCurrentPageNumber(pn) {
		return pn > this.getPageCount() ? this.getPageCount() : pn < 1 ? 1 : pn;
	}

}