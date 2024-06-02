import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.services';

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
              private auth: AuthService,
              private router: Router){}

  ngOnInit(): void {
      
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required]
    });
    // localStorage.removeItem('connectedUser');
  }

  onNaviguateToSignupPage(): void{

    this.router.navigateByUrl('/signup');
  }

  onConnectUser(): void{

    this.auth.login(this.loginForm.value).subscribe(success => {

      if (success) {
        this.router.navigateByUrl('/home');
      } else {
        alert('Login failed');
      }
    });
  //   if(this.auth.login(this.loginForm.value)){
  //     this.router.navigateByUrl('/home');
  //   }
  //   else{
  //     alert('Login failed');
  //   }
  }
}
