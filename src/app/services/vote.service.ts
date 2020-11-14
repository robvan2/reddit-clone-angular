import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VotePayload } from '../models/vote.payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  url: string = 'http://localhost:8080/api/votes';
  header: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Accept": "application/json" });

  constructor(private http: HttpClient) { }

  votePost(vote: VotePayload): Observable<any> {
    return this.http.post<any>(this.url, vote, { headers: this.header });
  }
}
