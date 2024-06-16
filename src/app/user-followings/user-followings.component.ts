import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-followings',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './user-followings.component.html',
  styleUrl: './user-followings.component.css'
})
export class UserFollowingsComponent implements OnInit {

  user$!: Observable<User>;

  constructor(private userService : UserService,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.getInformations();
  }

  getInformations(): void{

    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
  }
}
