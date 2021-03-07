import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userParams: any = {};
  pagination: Pagination
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    {value: 'male', display: 'Males'},
    {value: 'female', display: 'Females'}
  ];
  



  constructor(
    private adminService: AdminService,
    private alertifyService: AlertifyService,
    private route:ActivatedRoute
    //private modalService: BsModalService
  ) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilter() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
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

   // editRolesModal(user: User) {
  //   const initialState = {
  //     user,
  //     roles: this.getRolesArray(user)
  //   };
  //   this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
  //   this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
  //     const rolesToUpdate = {
  //       roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
  //     };
  //     if (rolesToUpdate) {
  //       this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(
  //         () => user.roles = [...rolesToUpdate.roleNames],
  //         (error) => this.alertifyService.error(error)
  //       );
  //     }
  //   });
  // }

}
