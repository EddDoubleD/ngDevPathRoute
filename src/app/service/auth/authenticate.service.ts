import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from 'src/app/model/IToken';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient : HttpClient) {}

  /**
   * send post request to url host:port/api/v1/auth/register with:
   * @param username login
   * @param password password
   * @param email email address
   * @param role security role one of USER/ADMIN/MANAGER
   * @returns IUser and token
   */
  public register(username : string, password : string, email : string, role : string) : Observable<IToken> {
    return this.httpClient.post<IToken>(`${environment.url}/api/v1/auth/register`, {
      username, 
      password,
      email,
      role
    });
  }

  /**
   * send post request to url host:port/api/v1/auth/authenticate with:
   * @param username login
   * @param password password
   * @returns IUser and token
   */
  public authenticate(username : string, password : string) : Observable<IToken> {
    return this.httpClient.post<IToken>(`${environment.url}/api/v1/auth/authenticate`, {username, password})
  }
}
