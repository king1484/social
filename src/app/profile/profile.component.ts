import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HttpClient } from '@angular/common/http';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile',
  imports: [NavComponent, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  name = '';
  email = '';
  mobile = '';
  isLoading = false;
  profilePicUrl = '';
  posts: any = [];

  http = inject(HttpClient);
  baseUrl = 'http://localhost:5000';

  ngOnInit() {
    this.isLoading = true;
    this.http
      .post(this.baseUrl + '/profile', { uid: localStorage.getItem('uid') })
      .subscribe({
        next: (data: any) => {
          this.name = data.name;
          this.email = data.email;
          this.mobile = data.mobile;
          this.profilePicUrl = data.profilePicUrl;
          this.getPosts();
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
        },
      });
  }

  getPosts() {
    this.http
      .get(`${this.baseUrl}/post/${localStorage.getItem('uid')}`)
      .subscribe({
        next: (res: any) => {
          this.posts = res;
          console.log(this.posts);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to fetch posts', error);
          this.isLoading = false;
        },
      });
  }
}
