import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HttpClient } from '@angular/common/http';
import { PostComponent } from '../post/post.component';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';

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
  postService = inject(PostService);
  authService = inject(AuthService);

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUserProfile(localStorage.getItem('uid')!)
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
    this.postService.getPostsByUID(localStorage.getItem('uid')!).subscribe({
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
