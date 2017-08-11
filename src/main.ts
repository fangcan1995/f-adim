import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 在polyfills.ts中会报Promise被第三方库覆盖的错误，所以移到这里

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule);
