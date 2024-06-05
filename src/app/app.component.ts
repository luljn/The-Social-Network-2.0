import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { LocalStorageService } from './services/localstorage.services';
import { PotentialFollowComponent } from './potential-follow/potential-follow.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserComponent,
    PotentialFollowComponent,
    UserPageComponent,
    ProfileComponent,
    NotificationsPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private localstorageService: LocalStorageService){}
 
  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        this.localstorageService.watchStorage();
      }
    });
  }
}
