import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  userdata:any;
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
 
 