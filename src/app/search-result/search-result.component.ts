import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';
import { LocalStorageService } from '../services/localstorage.services';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {

  users$!: Observable<User[]>;

  constructor(private userService: UserService,
              private localstorageService: LocalStorageService
  ){}

  ngOnInit(): void {
      
    const searchItem = this.localstorageService.getItem('searchItem')?.toString()
    if(searchItem != undefined){
      this.users$ = this.userService.getUserByName(searchItem);
    }
  }
}
