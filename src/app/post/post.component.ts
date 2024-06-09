import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, LowerCasePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserService } from '../services/user.services';
import { User } from '../models/user.models';
import { Title } from 'chart.js';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  connectedUser!: User | null;  // This variable is used to determine if the user is connected or not.

  constructor(private postService: PostServices,
              private router: Router,
              private userService: UserService){}

  ngOnInit(): void {
      
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }
}
