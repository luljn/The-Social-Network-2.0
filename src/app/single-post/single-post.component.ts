import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostServices } from '../services/post.services';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { AsyncPipe, DatePipe, LowerCasePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    UpperCasePipe,
    TitleCasePipe,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit{

  post$!: Observable<Post>;
  connectedUser!: User | null;  // This variable is used to determine if the user is connected or not.

  constructor(private postService: PostServices,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
      
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postService.getPostById(postId);
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }

  
}
