import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { RegisterComponent } from './register/register.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: '', component: TemplateComponent, pathMatch: 'full' },
  // { path: 'admin-login', component: AdminLoginComponent },
  // { path: 'portfolio-list', component: PortfolioListComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'template/:email', component: TemplateComponent },
  // { path: '**', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
