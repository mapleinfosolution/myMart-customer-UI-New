import { NgModule } from '@angular/core';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbCollapseModule, NgbModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbPaginationModule, NgbAlertModule, NgbCollapseModule, NgbModule],
  exports: [NgbPaginationModule, NgbAlertModule, NgbCollapseModule, NgbModule],
})
export class BootstrapModule {}
