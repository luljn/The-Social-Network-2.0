import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  @Input() post!: Post;

  constructor(private postService: PostServices,
              private router: Router){}

  ngOnInit(): void {
      
  }
}
