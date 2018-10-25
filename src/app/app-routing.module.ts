import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' }, // full as we bind to empty string. If not full, any path will start from empty string
  { path: 'company/list', component: CompanyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
