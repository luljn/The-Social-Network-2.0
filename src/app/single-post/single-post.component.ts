import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostServices } from '../services/post.services';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { AsyncPipe, DatePipe, LowerCasePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

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
  liked!: boolean;

  constructor(private postService: PostServices,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute){}

  ngOnInit(): void {

    this.liked = false;
      
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postService.getPostById(postId);
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }

  onAddOrRemoveLike(idPost: number): void{

    if(this.liked == false){

      this.post$ = this.postService.likeOrUnlikePost(idPost, 'like').pipe(
        tap(() => {
          this.liked = true;
        })
      );
    }

    else {

      this.post$ = this.postService.likeOrUnlikePost(idPost, 'unlike').pipe(
        tap(() => {
          this.liked = false;
        })
      );
    }
  }
}
