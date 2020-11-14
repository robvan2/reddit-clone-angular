import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { SignupRequestPayload } from '../components/auth/signup/SignupRequest.payload';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequestPayload } from '../components/auth/login/login.request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError, map, tap } from 'rxjs/operators'
import { LoginResponsePayload } from '../components/auth/login/login.response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: String = "http://localhost:8080";
  header: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Accept": "application/json" });

  constructor(private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  signup(signupRequest: SignupRequestPayload): Observable<any> {
    return this.http.post(`${this.url}/api/auth/signup`, signupRequest, { headers: this.header, responseType: "text" });
  }

  login(loginRequest: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(`${this.url}/api/auth/login`, loginRequest, { headers: this.header })
      .pipe(
        map(data => {
          if (!data.authToken) {
            throw new Error('Logging failed');
          }
          this.localStorage.store('authenticationToken', data.authToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiredAt);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  getJwt(): String {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken(): Observable<LoginResponsePayload> {
    const refreshToken = {
      refreshToken: this.localStorage.retrieve('refreshToken'),
      username: this.localStorage.retrieve('username')
    }

    return this.http.post<LoginResponsePayload>(
      `${this.url}/api/auth/refresh/token`, refreshToken, { headers: this.header }
    ).pipe(
      tap<LoginResponsePayload>(
        (response: LoginResponsePayload) => {
          this.localStorage.store('authenticationToken', response.authToken);
          this.localStorage.store('expiresAt', response.authToken);
        },
        (e: any) => {
          console.log('something went wrong while refreshing token ' + e);
        }
      )
    );
  }
  isLoggedIn() {
    return this.localStorage.retrieve('authenticationToken') != null;
  }
  getUserName() {
    return this.localStorage.retrieve('username')
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
