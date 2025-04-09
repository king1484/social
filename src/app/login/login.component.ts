import { HttpClient } from '@angular/common/http';
import { Component, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  router = inject(Router);
  form = viewChild.required<NgForm>('form');
  authService = inject(AuthService);
  error = '';
  isLoading = false;

  login() {
    if (this.form().valid) {
      this.authService.login(this.email, this.password)
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            console.log(res);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('uid', res._id);
            this.form().reset();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.error = 'Invalid credentials. Please try again.';
          },
        });
    }
  }
}
