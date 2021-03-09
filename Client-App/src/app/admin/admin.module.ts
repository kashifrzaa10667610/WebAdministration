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


@NgModule({
  imports: [CommonModule, 
  AdminRoutingModule,
  ModalModule.forRoot(),
  TabsModule.forRoot(),
  PaginationModule.forRoot(),
  BsDropdownModule.forRoot(),
  ButtonsModule.forRoot(),
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
    EditUserModalComponent
  
  ],
  providers:[UserlistResolver],
  entryComponents: [
    RolesModalComponent,
    AddUserModalComponent
 ],
})
export class AdminModule { }
