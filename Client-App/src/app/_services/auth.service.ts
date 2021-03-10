import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  

import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../_models/user";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + "auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          //console.log("decoded token")
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + "register", user);
  }

  loggedIn() {
    let token:any = localStorage.getItem("token");
    //token=token==null?undefined:token;
    return !this.jwtHelper.isTokenExpired(token);
    
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    let isMatch = false;
    const userRoles = JSON.parse(localStorage.getItem("user")).userRoles as Array<String>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }}