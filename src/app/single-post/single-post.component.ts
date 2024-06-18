import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostServices } from '../services/post.services';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { AsyncPipe, DatePipe, LowerCasePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Comment } from '../models/comment.models';
import { CommentService } from '../services/comment.services';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    UpperCasePipe,
    TitleCasePipe,
    AsyncPipe,
    NgIf,
    CommentComponent
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit{

  post$!: Observable<Post>;
  commentsNumber!: number;
  connectedUser!: User | null;  // This variable is used to determine if the user is connected or not.
  liked!: boolean;

  constructor(private postService: PostServices,
              private commentService: CommentService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute){}

  ngOnInit(): void {

    this.liked = false;
      
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postService.getPostById(postId);
    this.commentService.getCommentsCount(postId).subscribe(
      numberOfComments => { this.commentsNumber = numberOfComments; }
    );
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

  onViewCommentPage(){

    const postId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`posts/comments/${postId}`);
  }
}
