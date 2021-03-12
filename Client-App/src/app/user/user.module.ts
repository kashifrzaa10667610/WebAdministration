import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoExtendsPipePipe } from '../_pipes/time-ago-extend-pipe';



@NgModule({
  imports: [CommonModule, UserRoutingModule,ReactiveFormsModule,FormsModule],
  declarations: [UserPanelComponent, UserDetailComponent,],
    entryComponents: [
 
   ],
})
export class UserModule { }
