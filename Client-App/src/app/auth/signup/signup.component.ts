import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


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
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = 
    this.formBuilder.group(
      {
        
        username: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required],
        gender: ["male"],
        name: ["", Validators.required],
        email:["", Validators.required],
        dateOfBirth: ["", Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
       
      },
      
    );
  }

 

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService
        .register(this.user)
        .subscribe(
          (data) => {
            console.log(data)},
            //this.alertifyService.success("Registration successful")},
          (error) => console.log(error),//this.alertifyService.error(error),
          () =>
            this.authService
              .login(this.user)
              .subscribe(
                () => this.router.navigate(["/home"]),
                (error) => this.alertifyService.error(error)
              )
        );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}