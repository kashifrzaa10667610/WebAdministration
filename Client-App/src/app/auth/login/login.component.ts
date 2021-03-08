import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authService:AuthService,
    private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertifyService.success('Logged in successfully');
      },
      error => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  

}
