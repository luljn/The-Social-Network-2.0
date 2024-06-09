import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.services';
import { tap } from 'rxjs';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  emailRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService){}

  ngOnInit(): void {
     
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.signupForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      adresse: [null, Validators.required],
      mdp: [null, Validators.required],
      date_de_naissance: [null, Validators.required],
    });
  }

  onSubmitForm(): void{

    this.userService.addUser(this.signupForm.value).pipe(
      tap(() => this.router.navigateByUrl(""))
    ).subscribe();
  }
}
