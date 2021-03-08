import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HasRoleDirective } from './has-role.directive';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';
import { HttpRequestInterceptorProvider } from './_interceptors/http-request.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HasRoleDirective,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      // config: {
      //   tokenGetter: tokenGetter,
      //   whitelistedDomains: ['localhost:5000'],
      //   blacklistedRoutes: ['localhost:5000/api/auth']
      // }
    })
   ],
  providers: [ErrorInterceptorProvider,HttpRequestInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
