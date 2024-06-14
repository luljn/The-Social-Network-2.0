import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, LowerCasePipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { tap } from 'rxjs';

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
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  connectedUser!: User | null;  // This variable is used to determine if the user is connected or not.
  liked!: boolean;

  constructor(private postService: PostServices,
              private router: Router,
              private userService: UserService){}

  ngOnInit(): void {
      
    this.liked = false;

    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }

  onAddOrRemoveLike(idPost: number): void{

    if(this.liked == false){

      this.postService.likeOrUnlikePost(idPost, 'like');
      this.liked = true;
    }

    else {

      this.postService.likeOrUnlikePost(idPost, 'unlike');
      this.liked = false;
    }
  }

  onViewSinglePost(){

    this.router.navigateByUrl(`posts/${this.post.id}`);
  }
}
