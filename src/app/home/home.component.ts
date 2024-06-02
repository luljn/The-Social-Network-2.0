import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { PostComponent } from '../post/post.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { User } from '../models/user.models';

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

  user?: User;
  posts$!: Observable<Post[]>;

  constructor(private postService: PostServices){}

  ngOnInit(): void {
      
    this.posts$ = this.postService.getAllPosts();
    this.getUser();
  }

  ngOnDestroy(): void {}

  getUser(): void{

    const connnectedUser = localStorage.getItem('connectedUser');

    if (connnectedUser) {
    
      this.user = JSON.parse(connnectedUser) as User;
    }
  }
}
