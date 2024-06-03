import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { PostComponent } from '../post/post.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { LocalStorageService } from '../services/localstorage.services';

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
              private userService: UserService,
              private localstorageService: LocalStorageService){}

  ngOnInit(): void {
      
    this.posts$ = this.postService.getAllPosts();
    if(this.getUser() !== null){

      this.user = this.getUser();
    }

    else{

      this.user = null;
    }
  }

  ngOnDestroy(): void {}

  getUser(): User | null {

    const connectedUser = this.localstorageService.getItem('connectedUser');

    if (connectedUser) {
      
      const newuser = JSON.parse(connectedUser) as User;
      this.users$ = this.userService.getAllUsersWithoutTheCurrent(newuser.id);
      return newuser;
    }

    return null;
  }
}
