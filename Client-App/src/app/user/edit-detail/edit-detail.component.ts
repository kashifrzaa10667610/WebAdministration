import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {
  userdata:any;
  userroles:Array<string>
  user:any;
  id: number;
  contactForm:FormGroup;
  @Output() updateSelectedUser = new EventEmitter();
  constructor(public bsModalRef: BsModalRef,private adminService:AdminService) { }
  ngOnInit(): void {
    this.createFormMethod(); 
    // this.contactForm.patchValue(this.data);
    this.adminService.getuserbyId(this.id).subscribe(data=>
      {

        this.userdata=data;
        this.userroles=this.userdata.userroles
        console.log(this.userdata);
        this.contactForm.patchValue(
          {
            id:data.id,
            name:data.name,
            phonenumber:data.phoneNumber,
            city:data.city,
            country:data.country,
            introduction:data.introduction
          }
        );


        
      })
    console.log('addmodal'+this.id);
  }

  createFormMethod()
  {
      this.contactForm = new FormGroup({
      id:new FormControl(''),
      name:new FormControl(''),
      phonenumber:new FormControl(''),
      introduction:new FormControl(''),
  
      country: new FormControl(''),
      city:new FormControl(''),
      
    })
  
  }
  updateuser() {
    this.updateSelectedUser.emit(this.contactForm.value);
    this.bsModalRef.hide();
  }

}