import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { Observable, filter } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit(): void {
    
    this.getInformations();
  }

  getInformations(): void{

    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
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
