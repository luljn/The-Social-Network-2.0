import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { PostComponent } from '../post/post.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostComponent,
    UserComponent,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  posts$!: Observable<Post[]>;

  constructor(private postService: PostServices){}

  ngOnInit(): void {
      
    this.posts$ = this.postService.getAllPosts();
  }

  ngOnDestroy(): void {
      
  }

}
