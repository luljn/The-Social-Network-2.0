import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


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
    private router: Router){}

  ngOnInit(): void {
     
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.signupForm = this.formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      address: [null, Validators.required],
      password: [null, Validators.required],
      birthdate: [null, Validators.required],
    });
  }
}
