import { Component, Input, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserServices } from '../services/user.services';
import { User } from '../models/user.models';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs';
import { PostServices } from '../services/post.services';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    UserComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  @Input() user!: User;
  userPosts$!: Observable<Post[]>;

  constructor(private userService: UserServices,
              private postService: PostServices
  ){}

  ngOnInit(): void {
      
  }
}
