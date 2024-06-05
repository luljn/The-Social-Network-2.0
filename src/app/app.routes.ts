import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NewPostComponent } from './new-post/new-post.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'notifications', component: NotificationsPageComponent},
    { path: 'statistiques', component: StatistiquesComponent},
    { path: 'nouveauPost', component: NewPostComponent },
    { path: 'users/:id', component: UserPageComponent },
    { path: 'profile/:id', component: ProfileComponent}
];
