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
import { PotentialFollowComponent } from '../potential-follow/potential-follow.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostComponent,
    UserComponent,
    NgFor,
    NgIf,
    AsyncPipe,
    PotentialFollowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  user?: User | null;
  isUserConnected!: boolean;
  posts$!: Observable<Post[]>;

  constructor(private postService: PostServices,
              private userService: UserService,
              private localstorageService: LocalStorageService){}

  ngOnInit(): void {
      
    this.posts$ = this.postService.getAllPosts();
    if(this.userService.getConnectedUser() !== null){

      this.user = this.userService.getConnectedUser()
    }

    else{

      this.user = null;
    }
  }

  ngOnDestroy(): void {}
}
