import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams } from "@angular/common/http";  
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // getUsersWithRoles() {
  //   return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  // }


  getUsersWithRoles(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      
      params = params.append('roleName', userParams.role);
      params = params.append('orderBy', userParams.orderBy);
    }
    console.log("inside admin method");
    return this.http.get<User[]>(this.baseUrl + 'admin/usersWithRole', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
            console.log(paginatedResult.pagination);
          }
          return paginatedResult;
        })
      );
  }




 

  createRole(role:{})
  {
     return this.http.post(this.baseUrl+ 'admin/createRole/',role);
  }
  
  deleteRole(rolename)
  {
    return this.http.delete(this.baseUrl+'admin/deleteRole/', rolename);
  }
  lockUnlock(user:User)
  {
    return this.http.post(this.baseUrl+'admin/lockunlock/'+user.username, user.username);
  }




  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.username, roles);
  }
  deleteUser(username)
  {
    return this.http.delete(this.baseUrl+'admin/deleteUser/',username); 
  }
   getuserbyId(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/userById/' + id );
  }

  updateuserbyId(id: number, user: User)
  {
    return this.http.put(this.baseUrl+'users/updateuser/'+id,user);

  }

}
 