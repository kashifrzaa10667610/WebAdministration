import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "admin",
    //canActivate:[AuthGuard],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    //loadChildren:()=>AdminModule,
    
   
  },
  {
    path: "auth",
    //loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    loadChildren:() =>AuthModule
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
