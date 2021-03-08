import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class UserlistResolver implements Resolve<User[]> {

  pageNumber:1;
  pageSize:5;
  constructor(
    private adminService:AdminService,
    private router:Router,
    private alertify:AlertifyService
  )
  {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    console.log("hello");
    return this.adminService.getUsersWithRoles(this.pageNumber, this.pageSize,null).pipe(
      catchError(() => {
        this.alertify.error('Problem retrieving data');
        console.log("hello");
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
