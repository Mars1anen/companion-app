import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import {MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogCreateAccountComponent } from './modals/dialog-create-account/dialog-create-account.component';

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: '', component: StartUpComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    StartUpComponent,
    HomeComponent,
    DialogCreateAccountComponent
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
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // Console.log route changes
    )
  ],
  providers: [AngularFirestore, FireAuthService, FirestoreService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogCreateAccountComponent]
})
export class AppModule { }
