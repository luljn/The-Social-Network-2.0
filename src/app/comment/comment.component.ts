import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.models';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    UpperCasePipe,
    RouterLink
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  @Input() comment!: Comment;
}
