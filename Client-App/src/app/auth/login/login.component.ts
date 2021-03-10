import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  retUrl:string="home"
  constructor(private authService:AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
                .subscribe(params => {this.retUrl = params.get('retUrl');
                 });
    console.log(this.retUrl);             
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertifyService.success('Logged in successfully');
      },
      error => {
        this.alertifyService.error(error);
      },
      () => {
       
          this.router.navigate( ['home']);
      }
    );
  }

  

}
