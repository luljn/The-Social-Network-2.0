import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.models';
import { UserServices } from '../services/user.services';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.services';

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

    if(this.userService.getConnectedUser() != null){

      this.user = this.userService.getConnectedUser();
    }
  }

  onDisconnectUser(): void{

    this.auth.logout;
    this.router.navigateByUrl("");
  }
}
