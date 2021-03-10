import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.css']
})
export class AddRoleModalComponent implements OnInit {

  name?:string;
  message:string;
  contactForm:FormGroup;
  @Output() createnewRole = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.createFormMethod(); 
    this.contactForm.setValue({
      rolename:this.name
    })
  }

  createFormMethod()
  {
      this.contactForm = new FormGroup({

      rolename:new FormControl('')
      
    })
  
  }
  createRole() {
    this.createnewRole.emit(this.contactForm.value);
    this.bsModalRef.hide();
  }


}
