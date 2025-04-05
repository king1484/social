import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  mobile = '';
  email = '';
  password = '';
  cpassword = '';
  form = viewChild.required<NgForm>('form');
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = 'http://localhost:5000';
  error = false;
  isLoading = false;

  register() {
    if (this.form().valid && this.password === this.cpassword) {
      this.http
        .post(`${this.baseUrl}/auth/register`, {
          name: this.name,
          mobile: +this.mobile,
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.error = false;
            alert('Registration successful');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('uid', data._id);
            this.form().reset();
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.error = true;
            console.log(error);
          },
        });
    }
  }
}
