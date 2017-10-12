import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './coupon.routing';
import { CouponService } from "./coupon.service";
import { CouponComponent } from './coupon.component';
import { CouponEditComponent } from './components/coupon-edit/coupon-edit.component';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    CouponComponent,
    CouponEditComponent,
    CouponAddComponent,
  ],
  providers: [
    CouponService,
  ],
})
export class CouponModule {
}
