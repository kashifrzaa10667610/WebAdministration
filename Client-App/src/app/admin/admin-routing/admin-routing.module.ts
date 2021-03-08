import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { RouterModule, Routes } from '@angular/router';
 import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { UserlistResolver } from '../_resolvers/userlist.resolver';
// import { RolesManagementComponent } from '../roles-management/roles-management.component';
// import { UserManagementComponent } from '../user-management/user-management.component';



  const routes: Routes = [
    {
     path: "",
     component: AdminPanelComponent,resolve: {users: UserlistResolver}
//     children: [
//       { path: "role", component: RolesManagementComponent },
//       { path: "user/:name", component: UserManagementComponent }
//     ]
  }
 ];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
