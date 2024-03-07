import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { protectGuard } from './protect.guard';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'userprofile/:username',
    component:UserprofileComponent,canActivate:[protectGuard]
  },
  {
    path:'adminprofile/:username',
    component:AdminprofileComponent,canActivate:[protectGuard]
  },
  {
    path:'status',
    component:StatusComponent,canActivate:[protectGuard]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }