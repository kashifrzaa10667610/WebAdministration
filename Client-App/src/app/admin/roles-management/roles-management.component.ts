import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Role } from 'src/app/_models/role';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AddRoleModalComponent } from '../add-role-modal/add-role-modal.component';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit {
  bsModalRef: BsModalRef;
  availableRoles: Array<{id:number, name:string}>=[]
  constructor(private adminService:AdminService,
    private modalService:BsModalService,
    private alertifyService:AlertifyService) 
  { }

  ngOnInit(): void {
    this.adminService.getRols()
    .subscribe((data:Role[])=>
    {
      data.forEach(element => {
      this.availableRoles.push({id:element.id,name:element.name});
      });
    });
  }

  addRole()
  {
    const initialState={
      name:'',
      message:'ADD'
    }

    this.bsModalRef=this.modalService.show(AddRoleModalComponent,{initialState});
    this.bsModalRef.content.createnewRole.subscribe((data:Role)=>
    this.adminService.createRole(data).subscribe(data=>
    console.log(data)),
    error=>this.alertifyService.error);

  }
  
  editRole(name)
  {
    const initialState={
      name,
      message:'EDIT'
    }
    this.bsModalRef=this.modalService.show(AddRoleModalComponent,{initialState});
    // this.bsModalRef.content.createnewRole.subscribe((data:Role)=>
    // this.adminService.editRole(data).subscribe(data=>
    // console.log(data)));

  }
  deleteRole(role)
  {
    this.adminService.deleteRole(role.name).subscribe(data=>console.log(),
    error=>this.alertifyService.error(error),
    ()=>{
      this.alertifyService.success('deleted');
      
    })
    
  }
 

}
