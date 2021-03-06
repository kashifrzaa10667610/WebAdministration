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

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }


  getUsers(page?, itemsPerPage?, userParams?, likeParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      
      params = params.append('roleName', userParams.roleName);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
          }
          return paginatedResult;
        })
      );
  }




  // getUser(id): Observable<User> {
  //   return this.http.get<User>(this.baseUrl + 'users/' + id );
  // }



  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.username, roles);
  }
  createRole(role:{})
  {
     return this.http.post(this.baseUrl+ 'admin/createRole/',role);
  }
  
  deleteRole(role)
  {
    return this.http.delete(this.baseUrl+'admin/deleteRole/', role);
  }
  lockUnlock(user:User)
  {
    return this.http.post(this.baseUrl+'admin/lockunlock/'+user.username, user.username);
  }
}
 