import { Component, Input, Output, OnChanges } from '@angular/core';
import { PreloadImageService } from '../../services/preload-image.service';
@Component({
  selector: 'preload-image',
  template: `<img [src]="defaultPath ? defaultPath : ''">`,
})
export class PreloadImageComponent implements OnChanges {
  @Input() path: string;
  @Input() defaultPath?: string;
  @Input() fallbackPath?: string;
  constructor(private _preloadImageService: PreloadImageService) {}
  ngOnChanges(changes) {
    this._preloadImageService.load(this.path)
    .then(() => {
      this.defaultPath = this.path;
    })
    .catch(() => {
      if ( this.fallbackPath ) {
        this.defaultPath = this.fallbackPath;
      }
    })
  }
}