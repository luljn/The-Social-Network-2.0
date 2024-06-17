import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, LowerCasePipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.models';
import { CommentService } from '../services/comment.services';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    NgIf,
    NgFor,
    RouterLink,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  comments$!: Observable<Comment[]>;
  connectedUser!: User | null;  // This variable is used to determine if the user is connected or not.
  liked!: boolean;

  constructor(private postService: PostServices,
              private commentService: CommentService,
              private router: Router,
              private userService: UserService){}

  ngOnInit(): void {
      
    this.liked = false;
    this.comments$ = this.commentService.getCommentsByPost(this.post.id);
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }

  onAddOrRemoveLike(idPost: number): void{

    if(this.liked == false){

      const newLikes = this.post.likes += 1;
      this.postService.updateNumberOfLikes(newLikes, idPost);
      this.liked = true;
    }

    else {

      const newLikes = this.post.likes -= 1;
      this.postService.updateNumberOfLikes(newLikes, idPost);
      this.liked = false;
    }
  }

  onViewSinglePost(){

    this.router.navigateByUrl(`posts/${this.post.id}`);
  }
}
