import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';



const routes: Routes = [
  {
    path: "",
    component: UserPanelComponent,
    children: [
      { path: "edit/:id", component: EditDetailComponent },
      { path: "detail/:id", component: UserDetailComponent }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class UserRoutingModule { }
