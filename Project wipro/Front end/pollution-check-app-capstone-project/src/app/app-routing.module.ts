import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ResultCardComponent } from './result-card/result-card.component';
import { AuthorizationGuard } from './services/authorization.guard';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path:'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate :[AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path:'wishlist',
    component:WishListComponent,
     canActivate :[AuthorizationGuard],
    pathMatch:'full'
  },
  {
    path:'**',
    component:PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
