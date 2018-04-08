import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './coupon.routing';
import { CouponService } from "./coupon.service";
import { CouponComponent } from './coupon.component';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    CouponComponent,
  ],
  providers: [
    CouponService,
  ],
})
export class CouponModule {
}
