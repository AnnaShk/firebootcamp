import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' }, // full as we bind to empty string. If not full, any path will start from empty string
  { path: 'company/list', component: CompanyListComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
  { path: 'admin', loadChildren: '../app/admin/admin.module#AdminModule' }  // When I hit the admin url u will load this module
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
