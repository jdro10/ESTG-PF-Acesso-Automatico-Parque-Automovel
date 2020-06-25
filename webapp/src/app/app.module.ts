import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ParkaccessComponent } from './parkaccess/parkaccess.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersComponent } from './users/users.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ParkmodeComponent } from './parkmode/parkmode.component';
import { FooterComponent } from './footer/footer.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { LoginComponent } from './login/login.component';
import { LoggeduserComponent } from './loggeduser/loggeduser.component';
import { SignupadminComponent } from './signupadmin/signupadmin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ParkaccessComponent,
    SidebarComponent,
    NavbarComponent,
    SignupComponent,
    HomepageComponent,
    UsersComponent,
    UserdetailsComponent,
    ParkmodeComponent,
    FooterComponent,
    UserupdateComponent,
    LoginComponent,
    LoggeduserComponent,
    SignupadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
