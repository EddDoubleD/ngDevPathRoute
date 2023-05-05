import { HttpEvent,HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


// token - header key 
const TOKEN_HEADER_KEY = 'Authorization';   

// todo: add error hanler
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private localStorage : StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.localStorage.getToken();
    if (token != null) {
        //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];