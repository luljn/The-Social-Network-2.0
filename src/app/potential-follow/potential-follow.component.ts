import { Component, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { User } from '../models/user.models';
import { AsyncPipe, NgFor } from '@angular/common';
import { LocalStorageService } from '../services/localstorage.services';
import { UserService } from '../services/user.services';
import { Router, RouterLink, NavigationEnd } from '@angular/router';

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

    const navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Unsubscribe to prevent multiple triggers
      navigationSubscription.unsubscribe();
      // Reload the window after navigation is complete
      window.location.reload();
    });
  
    // Navigate to the desired URL
    this.router.navigateByUrl(`/users/${id}`);
  }
}
