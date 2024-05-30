import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailRegex!: RegExp;   // To verify the format of the user email address.

  constructor(private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void {
      
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required]
    });
  }

  onNaviguateToSignupPage(): void{

    this.router.navigateByUrl('/singup');
  }

  onConnectUser(): void{

    this.router.navigateByUrl('/home');
  }
}
