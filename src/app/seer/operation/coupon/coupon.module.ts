import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './coupon.routing';
import { CouponService } from "./coupon.service";
import { CouponComponent } from './coupon.component';
import { CouponEditComponent } from './components/coupon-edit/coupon-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    CouponComponent,
    CouponEditComponent,
  ],
  providers: [
    CouponService,
  ],
})
export class CouponModule {
}
