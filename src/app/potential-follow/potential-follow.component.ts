import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';
import { AsyncPipe, NgFor } from '@angular/common';
import { LocalStorageService } from '../services/localstorage.services';
import { UserService } from '../services/user.services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-potential-follow',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './potential-follow.component.html',
  styleUrl: './potential-follow.component.css'
})
export class PotentialFollowComponent implements OnInit {

  potentialFollows$!: Observable<User[]>;

  constructor(private localstorageService: LocalStorageService,
              private userService: UserService,
              private router: Router
  ){}

  ngOnInit(): void {
      
    this.getPotentialFollows();
  }

  getPotentialFollows(): void {

    const connectedUser = this.localstorageService.getItem('connectedUser');

    if (connectedUser) {
      
      const newuser = JSON.parse(connectedUser) as User;
      this.potentialFollows$ = this.userService.getAllUsersWithoutTheCurrent(newuser.id);
    }
  }

  onGetFollow(id: number): void{

    this.router.navigateByUrl(`/users/${id}`);
    // window.location.reload();
  }
}
