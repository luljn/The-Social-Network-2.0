import { Component, Input, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
import { PostServices } from '../services/post.services';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { UserFollowingsComponent } from '../user-followings/user-followings.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    UserComponent,
    PostComponent,
    UserFollowingsComponent,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  user$!: Observable<User>;
  userPosts$!: Observable<Post[]>;
  connectedUser!: User | null ; // Connected User.

  constructor(private userService: UserService,
              private postService: PostServices,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.getInformations();
  }

  getInformations(): void{

    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
    this.userPosts$ = this.postService.getPostsByUser(userId);
    this.connectedUser = this.userService.getConnectedUser();
  }
}
