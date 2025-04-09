import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PostComponent } from '../post/post.component';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  imports: [NavComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postSevice = inject(PostService);
  posts: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.postSevice.getAllPosts().subscribe({
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
