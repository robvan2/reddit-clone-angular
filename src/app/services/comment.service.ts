import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../models/comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = 'http://localhost:8080/api/comments';
  header: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Accept": "application/json" });

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId: Number): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`${this.url}/by-post/${postId}`, { headers: this.header })
  }
  postComment(comment: CommentPayload): Observable<CommentPayload> {
    return this.http.post<CommentPayload>(this.url, comment, { headers: this.header });
  }
  getAllCommentsByUser(name: String): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`${this.url}/by-user/${name}`, { headers: this.header });
  }
}
