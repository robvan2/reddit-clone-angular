import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostPayload } from '../models/post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = 'http://localhost:8080/api/posts';
  header: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Accept": "application/json" });


  constructor(private http: HttpClient) { }

  allPosts(): Observable<Array<PostPayload>> {
    return this.http.get<Array<PostPayload>>(this.url, { headers: this.header });
  }

  create(post: PostPayload): Observable<any> {
    return this.http.post(this.url, post, { headers: this.header });
  }
  getPostById(id: Number): Observable<PostPayload> {
    return this.http.get<PostPayload>(this.url + '/' + id, { headers: this.header });
  }

  getAllPostsByUser(name: String): Observable<Array<PostPayload>> {
    return this.http.get<Array<PostPayload>>(`${this.url}/by-user/${name}`, { headers: this.header })
  }
  getAllPostsBySubreddit(id: Number): Observable<Array<PostPayload>> {
    return this.http.get<Array<PostPayload>>(`${this.url}/by-subreddit/${id}`, { headers: this.header })
  }
}
