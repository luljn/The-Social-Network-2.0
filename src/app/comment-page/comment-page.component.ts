import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.services';
import { Comment } from '../models/comment.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-page',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    ReactiveFormsModule
  ],
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.css'
})
export class CommentPageComponent implements OnInit {

  comments$!: Observable<Comment[]>;
  commentForm!: FormGroup;

  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
      
    const postId = +this.route.snapshot.params['id'];
    this.comments$ = this.commentService.getCommentsByPost(postId);
    this.commentForm = this.formBuilder.group({
      contenu: [null, Validators.required]
    });
  }

  onGetPostComponent(){

    const postId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/posts/${postId}`);
  }
}
