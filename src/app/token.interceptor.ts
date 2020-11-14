import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginResponsePayload } from './components/auth/login/login.response.payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    isTokenRefreshing: boolean = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/refresh/token') || req.url.includes('/login') || req.url.includes('/signup')) {
            return next.handle(req);
        }
        const jwt = this.authService.getJwt();
        if (jwt) {
            req = this.addToken(req, jwt);
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && (error.status === 403)) {
                return this.handleAuthError(req, next);
            } else {
                return throwError(error);
            }
        }
        ));
    }
    handleAuthError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwt()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwt: String) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwt)
        });
    }
}