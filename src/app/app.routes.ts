import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'notifications', component: NotificationsPageComponent, canActivate: [AuthGuard]},
    { path: 'statistics', component: StatistiquesComponent, canActivate: [AuthGuard]},
    { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard]},
    { path: 'search', component: SearchResultComponent},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: 'about', component: AboutComponent},
    { path: 'users/:id', component: UserPageComponent},
    { path: 'posts/:id', component: SinglePostComponent},
    { path: 'posts/comments/:id', component: CommentPageComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]}
];
