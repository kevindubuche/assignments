import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from "@angular/material/select";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatStepperModule} from "@angular/material/stepper";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersComponent} from "./user/users/users.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {AuthComponent} from "./user/auth/auth.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {DetailUserComponent} from "./user/detail-user/detail-user.component";
import { AuthInterceptor } from './shared/AuthInterceptor';

const routes:Routes = [
  {
    path:"", component: AssignmentsComponent
  },
  {
    path:"home", component: AssignmentsComponent
  },
  {
    path:"add", component: AddAssignmentComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"assignment/:id", component: AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit", component: EditAssignmentComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"user-list", component: UsersComponent
  },
  {
    path:"user-add", component: AddUserComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"user/:id/edit", component: EditUserComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"user/:id", component: DetailUserComponent
  },
  {
    path:"login", component: AuthComponent
  },
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DetailUserComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes), MatSelectModule, DragDropModule, MatStepperModule, MatToolbarModule, ReactiveFormsModule, MatPaginatorModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
