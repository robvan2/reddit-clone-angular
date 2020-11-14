import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subreddit } from '../models/subreddit';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  header: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Accept": "application/json" });
  url: string = 'http://localhost:8080/api/subreddit';
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<Subreddit>> {
    return this.http.get<Array<Subreddit>>(this.url, { headers: this.header });
  }

  createSubreddit(subreddit: Subreddit): Observable<any> {
    return this.http.post(`${this.url}`, subreddit, { headers: this.header });
  }
  getSubredditById(id: Number): Observable<Subreddit> {
    return this.http.get<Subreddit>(`${this.url}/${id}`)
  }
}
