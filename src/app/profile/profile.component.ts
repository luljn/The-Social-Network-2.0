import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { LocalStorageService } from '../services/localstorage.services';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  // @Input() user!: User;
  user$!: Observable<User>;
  connectedUser!: User | null ; // Connected User.

  constructor(private userService: UserService,
              private localstorageService: LocalStorageService,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.getInformations();
  }

  getInformations(): void{

    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }
}
