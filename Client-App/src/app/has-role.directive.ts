import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input() appHasRole: string[];

  isVisible = false;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRed: TemplateRef<any>,
    private authService: AuthService
    ) {
 
     }

  ngOnInit(): void {
    //console.log(JSON.parse(localStorage.getItem("user")).userRoles);
   // console.log("inside hasRoleDirective");
    const userRoles = JSON.parse(localStorage.getItem("user")).userRoles as Array<string>;
   // console.log("usersRole");
    //console.log(userRoles);
    if (!userRoles) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRed);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
