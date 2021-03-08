import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  bsModalRef: BsModalRef;
  user: User = JSON.parse(localStorage.getItem('user'));
  roleList = [
    {value:'Admin',display:'Admin'},
    {value: 'Member', display: 'Member'},
    {value: 'VIP', display: 'VIP'},
    {value:'HelpDesk', display:'HelpDesk'}
  ];
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
  }

  // getUseraWithRoles() {
  //   this.adminService.getUsersWithRoles().subscribe(
  //     (users: User[]) => this.users = users,
  //     error => this.alertifyService.error(error)
  //   );
  // }
  getUseraWithRoles() {
    this.adminService
    .getUsersWithRoles(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.userParams
    )
    .subscribe(
      (result: PaginatedResult<User[]>) => {
        this.users = result.result;
        this.pagination = result.pagination;
      },
      error => this.alertifyService.error(error)
    );

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
          () => user.roles = [...rolesToUpdate.roleNames],
          (error) => this.alertifyService.error(error)
        );
      }
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];
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

  }
  deleteUser(user:User)
  {

  }

}
