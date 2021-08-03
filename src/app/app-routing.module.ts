import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'searches-history',loadChildren:()=> import('./components/searches-history/searches-history.module')
    .then(m => m.SearchesHistoryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
