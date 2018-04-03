import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './risk-rating.routing';
import { RiskRatingService } from "./risk-rating.service";
import { RiskRatingComponent } from './risk-rating.component';
import { RiskRatingEditComponent } from './components/risk-rating-edit/risk-rating-edit.component';
import { RiskRatingDetailComponent } from './components/risk-rating-detail/risk-rating-detail.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    RiskRatingComponent,
    RiskRatingEditComponent,
    RiskRatingDetailComponent
  ],
  providers: [
    RiskRatingService,
  ],
})
export class RiskRatingModule {
}
