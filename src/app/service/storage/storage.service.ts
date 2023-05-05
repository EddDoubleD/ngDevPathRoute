import { Injectable } from '@angular/core';
import { IToken } from 'src/app/model/IToken';
import { IUser } from 'src/app/model/IUser';

const USER_KEY = 'auth-user';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * Cleaning up storage
   */
  clean(): void {
    window.sessionStorage.clear();
  }

  /**
   * Save usaer as json with USER_KEY
   * @param user user to save
   */
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Find user from storage
   * @returns current user or empty user with role: not authorized
   */
  public getUser(): IUser {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {
      role: "not authorized"
    };
  }

  /**
   * Check loggining user
   * @returns ok - true, fail - false
   */
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  /**
   * Save jwt token on session storage
   * @param token session jwt token
   */
  public saveToken(token : IToken) : void {
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.setItem(USER_TOKEN, JSON.stringify(token));
  }

  /**
   * Get current token 
   * @returns current jwt token or empty
   */
  public getToken() : IToken {
    const token = window.sessionStorage.getItem(USER_TOKEN);
    if (token) {
      return JSON.parse(token);
    }

    return {};
  }
}
