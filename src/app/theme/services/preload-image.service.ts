import { Injectable } from '@angular/core';

@Injectable()
export class PreloadImageService {
	public load(path): Promise<any> {
	  return new Promise((resolve, reject) => {
	    let image = new Image();
	    image.onload = resolve;
	    image.onerror = reject;
	    image.src = path;
	  });
	}
}