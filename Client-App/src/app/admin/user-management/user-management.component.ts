import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserRoutingModule } from 'src/app/user/user-routing/user-routing.module';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  availableRoles: Array<{name:string, value:string}>=[]
  bsModalRef: BsModalRef;
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private adminService: AdminService,
    private alertifyService: AlertifyService,
    private modalService: BsModalService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.role='Member';
    this.userParams.orderBy = 'lastActive';
  
    this.getUseraWithRoles();
    this.getRoles();
  }

  // getUseraWithRoles() {
  //   this.adminService.getUsersWithRoles().subscribe(
  //     (users: User[]) => this.users = users,
  //     error => this.alertifyService.error(error)
  //   );
  // }
  getUseraWithRoles() {
    console.log("hello");
    this.adminService
    .getUsersWithRoles(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.userParams
    )
    .subscribe(
      (result: PaginatedResult<User[]>) => {
        console.log("hello1");
        this.users = result.result;
        console.log("abc");
        console.log(this.users);
        console.log("abc");
        this.pagination = result.pagination;
      },
      error => this.alertifyService.error(error)
    );

  }

  addUserModel()
  {
    this.bsModalRef=this.modalService.show(EditUserModalComponent,{});
    this.bsModalRef.content.createSelectedUser.subscribe((user:User)=>
    {
      this.adminService.creteUser(user)
      .subscribe(response=>console.log(response),
      error=>this.alertifyService.error(error),)
    //need to create method in service;
    })
  }

  editUser(id,user)
  {   
    console.log(user.id+'from editusermethod');
    const initialState={
      id,
      user
    }
    this.bsModalRef=this.modalService.show(AddUserModalComponent,{initialState});
    this.bsModalRef.content.updateSelectedUser.subscribe((value)=>
    {
       this.adminService.updateuserbyId(value.id, value).subscribe(result=>
        {
          console.log(result);
        })
    })
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(
          () => user.userRoles = [...rolesToUpdate.roleNames],
          (error) => this.alertifyService.error(error)
        );
      }
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.userRoles;
    // const availableRoles: any[] = [
    //    {name: 'Admin', value: 'Admin'},
    //    {name: 'Moderator', value: 'Moderator'},
    //    {name: 'Member', value: 'Member'},
    //    {name: 'VIP', value: 'VIP'}
    
    // ];
    const availableRoles:any[]=this.availableRoles;
    availableRoles.forEach(role => {
      let isMatch = false;
      userRoles.forEach(userRole => {
        if (role.name === userRole) {
          isMatch = true;
          return;
        }
      });
      role.checked = isMatch;
      roles.push(role);
    });
    return roles;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUseraWithRoles();
  }

  resetFilter() {
    this.userParams.role = 'Member';

    this.getUseraWithRoles();
  }

  lockUnlock(user:User)
  {
    this.adminService.lockUnlock(user).
    subscribe((user:User)=>
      {
        this.user===user;
      },
      error => this.alertifyService.error(error));

  }
  deleteUser(user:User)
  {
    this.adminService.deleteUser(user.username)
    .subscribe((users)=>
    {
      console.log(users);
    })

  }

  IsLockedout(lockoutEnd)
  {
    if(lockoutEnd===null)
    {
      return true;
    }
    return false;
  }
  getRoles()
  {
    this.adminService.getRols()
    .subscribe((data:Role[])=>
    {
      data.forEach(element => {
      this.availableRoles.push({name:element.name,value:element.name});
      });
    });
    return this.availableRoles;
  }

}
