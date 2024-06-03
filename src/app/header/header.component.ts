import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.services';
import { LocalStorageService } from '../services/localstorage.services';
import { Subscription } from 'rxjs';

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
export class HeaderComponent implements OnInit, OnDestroy {

  searchForm!: FormGroup;
  user?: User | null;
  private storageSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private localstorageService: LocalStorageService,
              private auth: AuthService,
              private userService: UserService){}

  ngOnInit(): void {
      
    this.searchForm = this.formBuilder.group({

      search: [null, Validators.required] 
    });

    
    this.storageSubscription = this.localstorageService.watchStorage().subscribe(() => {
      
      if(this.userService.getConnectedUser() != null){

        this.user = this.userService.getConnectedUser();
      }

      else{

        this.user = null;
      }
    });
  }

  onDisconnectUser(): void{

    this.auth.logout();
    this.router.navigateByUrl("");
  }

  ngOnDestroy(): void {

    if (this.storageSubscription) {

      this.storageSubscription.unsubscribe();
    }
  }
}
