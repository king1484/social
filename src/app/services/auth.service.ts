import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000';
  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, {
      email: email,
      password: password,
    });
  }

  register(name: string, mobile: number, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    });
  }

  getUserProfile(uid: string) {
    return this.http.post(this.baseUrl + '/profile', {
      uid: uid,
    });
  }
}
