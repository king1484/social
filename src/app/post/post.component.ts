import { MomentModule } from 'ngx-moment';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  imports: [MomentModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input({ required: true }) post: any;
  @Input({ required: true }) isAuthor: boolean = false;
  isLiked = false;
  postService = inject(PostService);
  router = inject(Router);

  ngOnInit() {
    if (this.post.likes.includes(localStorage.getItem('uid'))) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  like() {
    if (!this.isLiked) {
      this.post.likes.push(localStorage.getItem('uid'));
      this.postService
        .likeUnlikePost(this.post._id, 'like', localStorage.getItem('uid')!)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.post.likes = this.post.likes.filter(
        (uid: string | null) => uid !== localStorage.getItem('uid')
      );
      this.postService
        .likeUnlikePost(this.post._id, 'unlike', localStorage.getItem('uid')!)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
    this.isLiked = !this.isLiked;
  }

  editPost(post: any) {
    this.router.navigate([
      '/newPost',
      {
        title: post.title,
        content: post.content,
        id: post._id,
      },
    ]);
  }

  deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.postService.deletePost(id).subscribe({
      next: (data) => {
        console.log(data);
        alert('Post deleted successfully');
        window.location.reload();
      },
    });
  }
}
