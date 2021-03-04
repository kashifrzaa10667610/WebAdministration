import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';



const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "login" },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
