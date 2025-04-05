import { Component, inject, Input, OnInit, viewChild } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  imports: [NavComponent, FormsModule],
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})
export class NewpostComponent implements OnInit {
  title: string = '';
  content: string = '';
  baseUrl = 'http://localhost:5000';
  http = inject(HttpClient);
  isLoading = false;
  form = viewChild.required<NgForm>('form');
  isEditing = false;
  route = inject(ActivatedRoute);
  id: string = '';
  router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = params['title'];
        this.content = params['content'];
        this.id = params['id'];
        this.isEditing = true;
        console.log('Editing post:', params['id']);
      }
    });
  }

  updatePost() {
    if (!this.title || !this.content) {
      return;
    }
    this.isLoading = true;
    console.log('Updating post...');
    this.http
      .patch(`${this.baseUrl}/post/${this.id}`, {
        title: this.title,
        content: this.content,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          alert('Post updated successfully!');
          this.router.navigate(['/profile']);
        },
      });
  }

  uploadPost() {
    if (!this.title || !this.content) {
      return;
    }
    this.isLoading = true;
    console.log('Uploading post...');
    const uid = localStorage.getItem('uid');
    this.http
      .post(`${this.baseUrl}/post`, {
        title: this.title,
        content: this.content,
        uid: uid,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.form().resetForm();
          alert('Post uploaded successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Failed to upload post', error);
          this.isLoading = false;
        },
      });
  }
}
