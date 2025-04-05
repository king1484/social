import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PostComponent } from '../post/post.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [NavComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:5000';
  posts: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.http.get(`${this.baseUrl}/post`).subscribe({
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
