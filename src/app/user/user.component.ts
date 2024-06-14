import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  @Input() user!: User;
  connectedUser!: User | null ; // Connected User.

  constructor(private userService: UserService,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      
    this.getInformations()
  }

  getInformations(): void{

    const userId = +this.route.snapshot.params['id'];
    // this.user$ = this.userService.getUserById(userId);
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser = this.userService.getConnectedUser();
    }
  }
}
