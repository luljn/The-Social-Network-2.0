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
  }

  onNaviguateToSignupPage(): void{

    this.router.navigateByUrl('/signup');
  }

  onConnectUser(): void{

    this.auth.login(this.loginForm.value).subscribe(success => {

      if (success){

        this.router.navigateByUrl('/home');
      }
      
      else{

        alert('Login failed');
      }
    });
  }

  togglePassword(): void{
    
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    if (passwordField && togglePasswordBtn) {
      const fieldType = passwordField.getAttribute('type');

      if (fieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        togglePasswordBtn.innerHTML = '<i class="bi bi-eye-slash"></i><span> Masquer le mot de passe</span>';
      } else {
        passwordField.setAttribute('type', 'password');
        togglePasswordBtn.innerHTML = '<i class="bi bi-eye"></i><span> Afficher le mot de passe</span>';
      }
    }
  }
}
