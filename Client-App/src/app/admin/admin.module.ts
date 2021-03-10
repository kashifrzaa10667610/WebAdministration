import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RolesManagementComponent } from './roles-management/roles-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistResolver } from './_resolvers/userlist.resolver';
import {ButtonsModule} from 'ngx-bootstrap/buttons'
import { TimeAgoExtendsPipePipe } from '../_pipes/time-ago-extend-pipe';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '../has-role.directive';
import { AddRoleModalComponent } from './add-role-modal/add-role-modal.component';


@NgModule({
  imports: [CommonModule, 
  AdminRoutingModule,
  BsDropdownModule.forRoot(),
  BsDatepickerModule.forRoot(),
  ButtonsModule.forRoot(),
  PaginationModule.forRoot(),
  TabsModule.forRoot(),
  ModalModule.forRoot(),
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  
],
  declarations: [
    AdminPanelComponent,
    RolesManagementComponent,
    UserManagementComponent,
    RolesModalComponent,
    TimeAgoExtendsPipePipe,
    AddUserModalComponent,
    EditUserModalComponent,
    HasRoleDirective,
    AddRoleModalComponent,
    //AdminHelpdeskRoleDirective 
  ],
  providers:[UserlistResolver],
  entryComponents: [
    RolesModalComponent,
    AddRoleModalComponent,
    EditUserModalComponent,
    AddUserModalComponent
 ],
})
export class AdminModule { }
