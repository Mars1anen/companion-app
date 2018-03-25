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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FireAuthService } from './services/fire-auth.service';
import { FirestoreService } from './services/firestore.service';
import { environment } from '../environments/environment';
import {MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MatSelectModule, MatTooltipModule} from '@angular/material';
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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BudgetComponent } from './budget/budget.component';
import { ViewModesManagerService } from './services/view-modes-manager.service';
import { AttachmentsComponent } from './attachments/attachments.component';
import { ImgStorageService } from './services/img-storage.service';
import { DialogAddAttachmentComponent } from './modals/dialog-add-attachment/dialog-add-attachment.component';
import { DialogHelpComponent } from './modals/dialog-help/dialog-help.component';
import { PageOneComponent } from './modals/dialog-help/pages/page-one/page-one.component';
import { PageTwoComponent } from './modals/dialog-help/pages/page-two/page-two.component';
import { PageThreeComponent } from './modals/dialog-help/pages/page-three/page-three.component';
import { IndexComponent } from './modals/dialog-help/pages/index/index.component';
import { PageFourComponent } from './modals/dialog-help/pages/page-four/page-four.component';
import { PageFiveComponent } from './modals/dialog-help/pages/page-five/page-five.component';
import { PageSixComponent } from './modals/dialog-help/pages/page-six/page-six.component';
import { ImageViewerComponent } from './modals/image-viewer/image-viewer.component';
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
    UnixToStringPipe,
    UserProfileComponent,
    BudgetComponent,
    AttachmentsComponent,
    DialogAddAttachmentComponent,
    DialogHelpComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    IndexComponent,
    PageFourComponent,
    PageFiveComponent,
    PageSixComponent,
    ImageViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
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
    ViewModesManagerService,
    ImgStorageService,
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
  entryComponents: [DialogCreateAccountComponent, DialogCreateItemComponent, SnackBarComponent, DialogAddAttachmentComponent, DialogHelpComponent, ImageViewerComponent]
})
export class AppModule { }
