import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StartUpComponent } from './start-up/start-up.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FireAuthService } from './services/fire-auth.service';
import { FirestoreService } from './services/firestore.service';
import { environment } from '../environments/environment';
import {MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MatSelectModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogCreateAccountComponent } from './modals/dialog-create-account/dialog-create-account.component';
import { DialogCreateItemComponent } from './modals/dialog-create-item/dialog-create-item.component';
import { ShowDeleteBtnDirective } from './directives/show-delete-btn.directive';
import { SnackBarService } from './services/snack-bar.service';
import { SnackBarComponent } from './modals/snack-bar/snack-bar.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { TimeToUnixService } from './services/time-to-unix.service';
import { UnixToStringPipe } from './pipes/unix-to-string.pipe';
const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: ':username', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: '', component: StartUpComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    StartUpComponent,
    HomeComponent,
    DialogCreateAccountComponent,
    DialogCreateItemComponent,
    ShowDeleteBtnDirective,
    SnackBarComponent,
    UnixToStringPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // Console.log route changes
    )
  ],
  providers: [
    AngularFirestore, 
    FireAuthService, 
    FirestoreService, 
    SnackBarService,
    TimeToUnixService, 
    AuthGuard, 
    {
    provide: DateAdapter, useClass: AppDateAdapter
    },
    {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }],
  bootstrap: [AppComponent],
  entryComponents: [DialogCreateAccountComponent, DialogCreateItemComponent, SnackBarComponent]
})
export class AppModule { }
