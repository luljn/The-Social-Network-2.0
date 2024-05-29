import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void {
      
    this.searchForm = this.formBuilder.group({

      search: [null, Validators.required] 
    });
  }
}
