import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserRoutingModule } from './user-routing/user-routing.module';



@NgModule({
  imports: [CommonModule, UserRoutingModule],
  declarations: [EditDetailComponent, UserPanelComponent, UserDetailComponent]
})
export class UserModule { }
