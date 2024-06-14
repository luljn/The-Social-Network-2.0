import { AsyncPipe, CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { PostServices } from '../services/post.services';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { User } from '../models/user.models';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
    DatePipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup;
  postPreview$!: Observable<Post>
  connectedUser!: User;

  constructor(private formBuilder: FormBuilder,
              private postService: PostServices,
              private userService: UserService,
              private router: Router
  ){}

  ngOnInit(): void {
      
    if(this.userService.getConnectedUser() !== null){

      this.connectedUser == this.userService.getConnectedUser();
    }
    this.postForm = this.formBuilder.group({
      contenu: [null, Validators.required]
    },
    // {
    //   updateOn : 'blur'
    // }
    );

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
  
        ...formValue,
        date_creation: new Date(),
        nom_utilisateur: this.userService.getConnectedUser()?.nom,
        prenom_utilisateur: this.userService.getConnectedUser()?.prenom
      }))
    );
  }

  onSubmitForm(): void{

    this.postService.addPost(this.postForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/users/${this.userService.getConnectedUser()?.id}`))
    ).subscribe();
  }
}
