import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import{BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  bsConfig:Partial<BsDatepickerConfig>;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD-MM-YYYY'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = 
    this.formBuilder.group(
      {
        
        username: ["", [Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]],
        password: [
          "",
          [
            Validators.required,

          ]
        ],
        confirmPassword: ["", Validators.required],
        gender: ["male",Validators.required],
        name: [""],
        email:["", [Validators.required,Validators.email]],
        dateOfBirth: ["", Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
       
      },{validator: this.matchPassword}
      
    );
  }

 

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService
        .register(this.user)
        .subscribe(
          () => this.alertifyService.success('Registration successful'),

          (error) => this.alertifyService.error(error),

          () => this.authService.login(this.user).subscribe(
          () => this.router.navigate(['/user']),
          (error) => this.alertifyService.error(error))
        );
    }
  }
  matchPassword(control: AbstractControl): ValidationErrors | null {
 
    const password = control.get("password").value;
    const confirm = control.get("confirmPassword").value;
 
 
    if (password != confirm) 
    { return { 'noMatch': true }
    }
 
    return null
 
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}