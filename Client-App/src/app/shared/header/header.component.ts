import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditDetailComponent } from 'src/app/user/edit-detail/edit-detail.component';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bsModalRef: BsModalRef;
  model: any = {};
  user:any;
  constructor(private authService:AuthService,
    private alertifyService:AlertifyService,
    private router :Router,
    private modalService: BsModalService,
    private adminService:AdminService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser=null;
    this.alertifyService.message('Logged out');
    this.router.navigate(['/home']);
    this.model.password = '';
  }
  editProfile()
  {
   const initialState={
    id:this.user.id,
    user:this.user
  }
  this.bsModalRef=this.modalService.show(EditDetailComponent,{initialState});
  this.bsModalRef.content.updateSelectedUser.subscribe((value)=>
  {
     this.adminService.updateuserbyId(value.id, value).subscribe(result=>
      {
        console.log(result);
      })
  })
}
}
