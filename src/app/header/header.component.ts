import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.services';
import { LocalStorageService } from '../services/localstorage.services';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
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

  onGetUserPersonnalPage(): void{

    const navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Unsubscribe to prevent multiple triggers
      navigationSubscription.unsubscribe();
      // Reload the window after navigation is complete
      window.location.reload();
    });
    const userId = this.user?.id;
    this.router.navigateByUrl(`/users/${userId}`);
  }

  onGetAdminPage(): void{

    this.router.navigateByUrl(`/admin`);
  }

  onGetAboutPage(): void{

    this.router.navigateByUrl(`/about`);
  }

  ngOnDestroy(): void {

    if (this.storageSubscription) {

      this.storageSubscription.unsubscribe();
    }
  }
}
