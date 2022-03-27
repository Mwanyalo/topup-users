import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './core/guard/auth.guard'
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
