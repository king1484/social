import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = 'http://localhost:5000';
  http = inject(HttpClient);

  getAllPosts() {
    return this.http.get(`${this.baseUrl}/post`);
  }

  getPostsByUID(uid: string) {
    return this.http.get(`${this.baseUrl}/post/${uid}`);
  }

  uploadPost(title: string, content: string, uid: string) {
    return this.http.post(`${this.baseUrl}/post`, {
      title: title,
      content: content,
      uid: uid,
    });
  }

  updatePost(id: string, title: string, content: string) {
    return this.http.patch(`${this.baseUrl}/post/${id}`, {
      title: title,
      content: content,
    });
  }

  deletePost(id: string) {
    return this.http.delete(`${this.baseUrl}/post/${id}`);
  }

  likeUnlikePost(id: string, action: string, uid: string) {
    return this.http.put(`${this.baseUrl}/post/like/${id}`, {
      action: action,
      uid: uid,
    });
  }
}
