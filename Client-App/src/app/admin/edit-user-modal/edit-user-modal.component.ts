import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  userdata:any;
  user:User;
  id: number;
  contactForm:FormGroup;
  @Output() createSelectedUser = new EventEmitter();


  constructor(public bsModalRef: BsModalRef) { }


  ngOnInit(): void {
    this.createFormMethod(); 
  }

  createFormMethod()
  {
      this.contactForm = new FormGroup({

      username:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]),
      email:new FormControl('',[Validators.required,Validators.email]),
      gender:new FormControl('',Validators.required),
      name:new FormControl(''),
      city:new FormControl('',Validators.required),      
      country: new FormControl('',Validators.required),
      
    })
  
  }
  createUser() {
    this.createSelectedUser.emit(this.contactForm.value);
    this.bsModalRef.hide();
  }
  get username() {
    return this.contactForm.get('username');
  } 
 
  get email() {
    return this.contactForm.get('email');
  } 
  get gender()
  {
    return this.contactForm.get('gender');
  }
 
  get city() {
    return this.contactForm.get('city');
  } 
 
  get country() {
    return this.contactForm.get('country');
  } 
}
 
 
