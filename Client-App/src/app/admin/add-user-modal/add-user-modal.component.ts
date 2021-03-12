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
      name:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(100)]),
      phonenumber:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      introduction:new FormControl(''),
      country: new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      
    })
  
  }

  updateuser() {
    this.updateSelectedUser.emit(this.contactForm.value);
    this.bsModalRef.hide();
  }


  get name() {
    return this.contactForm.get('name');
  } 
 
  get phonenumber() {
    return this.contactForm.get('phonenumber');
  } 
 
  get city() {
    return this.contactForm.get('city');
  } 
 
  get country() {
    return this.contactForm.get('country');
  } 
  get introduction()
  {
    return this.contactForm.get('introduction');
  }
 
  
}
 
 