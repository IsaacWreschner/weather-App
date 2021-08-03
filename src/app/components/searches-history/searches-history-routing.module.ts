import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchesHistoryComponent } from './searches-history.component';

const routes: Routes = [
  {path:'',component:SearchesHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchesHistoryRoutingModule { }
