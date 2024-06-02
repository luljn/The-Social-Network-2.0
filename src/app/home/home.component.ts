import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { PostComponent } from '../post/post.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { User } from '../models/user.models';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostComponent,
    UserComponent,
    NgFor,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  user?: User | null;
  isUserConnected!: boolean;
  posts$!: Observable<Post[]>;
  users$!: Observable<User[]>;

  constructor(private postService: PostServices,
              private userService: UserServices){}

  ngOnInit(): void {
      
    this.posts$ = this.postService.getAllPosts();
    if(this.userService.getConnectedUser() !== null){

      this.user = this.getUser();
    }
  }

  ngOnDestroy(): void {}

  getUser(): User | null {

    const connnectedUser = localStorage.getItem('connectedUser');

    if (connnectedUser) {
      
      const newuser = JSON.parse(connnectedUser) as User;
      this.users$ = this.userService.getAllUsersWithoutTheCurrent(newuser.id);
      return newuser;
    }

    return null;
  }
}
