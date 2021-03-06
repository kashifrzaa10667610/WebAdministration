import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RolesManagementComponent } from './roles-management/roles-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [
    AdminPanelComponent,
    RolesManagementComponent,
    UserManagementComponent
  ]
})
export class AdminModule { }
