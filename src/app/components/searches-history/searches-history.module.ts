import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchesHistoryRoutingModule } from './searches-history-routing.module';
import { SearchesHistoryComponent } from './searches-history.component';


@NgModule({
  declarations: [
    SearchesHistoryComponent
  ],
  imports: [
    CommonModule,
    SearchesHistoryRoutingModule
  ]
})
export class SearchesHistoryModule { }
