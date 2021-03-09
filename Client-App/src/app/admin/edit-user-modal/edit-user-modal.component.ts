import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  userdata:any;
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

      username:new FormControl('helo'),
      email:new FormControl(''),
      gender:new FormControl(''),
      name:new FormControl(''),
      city:new FormControl(''),      
      country: new FormControl(''),
      
    })
  
  }
  createUser() {
    this.createSelectedUser.emit(this.contactForm.value);
    this.bsModalRef.hide();
  }

}
 
 
