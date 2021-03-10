import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, ActivatedRoute, Route, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService,private alertifyService:AlertifyService,private  activatedRoute:ActivatedRoute,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot, 
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const roles = this.activatedRoute.snapshot.firstChild.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      }
      
      this.router.navigate(['home']);
      this.alertifyService.error('You are not authorised to access this area');
      
    }
    if (this.authService.loggedIn()) {
      console.log('ddfdfdfdf');
      return false;
    }
    this.alertifyService.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }

  
}