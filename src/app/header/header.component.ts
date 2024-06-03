import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.models';
import { UserServices } from '../services/user.services';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.services';
import { AsyncLocalStorage } from 'node:async_hooks';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  searchForm!: FormGroup;
  user?: User | null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserServices,
              private auth: AuthService){}

  ngOnInit(): void {
      
    this.searchForm = this.formBuilder.group({

      search: [null, Validators.required] 
    });

    if(this.getUser() != null){

      this.user = this.getUser();
    }
  }

  getUser(): User | null {

    const connectedUser = localStorage.getItem('connectedUser');

    if (connectedUser) {
      
      const newuser = JSON.parse(connectedUser) as User;
      return newuser;
    }

    return null;
  }

  onDisconnectUser(): void{

    this.auth.logout;
    localStorage.removeItem('connectedUser');
    this.router.navigateByUrl("");
  }
}
