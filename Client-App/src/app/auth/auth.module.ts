import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ErrorInterceptorProvider } from '../_interceptors/error.interceptor';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [LoginComponent, SignupComponent],

  providers: [AuthService,AlertifyService,]
})
export class AuthModule { }
