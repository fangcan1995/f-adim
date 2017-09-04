import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './risk-rating.routing';
import { RiskRatingService } from "./risk-rating.service";
import { RiskRatingComponent } from './risk-rating.component';
import { RiskRatingEditComponent } from './components/risk-rating-edit/risk-rating-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    RiskRatingService,
    RiskRatingEditComponent,
  ],
  providers: [
    RiskRatingService,
  ],
})
export class RiskRatingModule {
}
