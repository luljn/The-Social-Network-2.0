import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.services';
import { Comment } from '../models/comment.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-page',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent
  ],
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.css'
})
export class CommentPageComponent implements OnInit {

  comments$!: Observable<Comment[]>;

  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit(): void {
      
    const postId = +this.route.snapshot.params['id'];
    this.comments$ = this.commentService.getCommentsByPost(postId);
  }

  onGetPostComponent(){

    const postId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/posts/${postId}`);
  }
}
