import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';
import { AsyncPipe, NgFor } from '@angular/common';
import { LocalStorageService } from '../services/localstorage.services';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-potential-follow',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe
  ],
  templateUrl: './potential-follow.component.html',
  styleUrl: './potential-follow.component.css'
})
export class PotentialFollowComponent implements OnInit {

  potentialFollows$!: Observable<User[]>;

  constructor(private localstorageService: LocalStorageService,
              private userService: UserService
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
}
