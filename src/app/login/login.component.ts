import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailRegex!: RegExp; 

  constructor(private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void {
      
    this.loginForm = this.formBuilder.group({
      mail: [null, Validators.required],
      mdp: [null, Validators.required]
    });
  }
}
