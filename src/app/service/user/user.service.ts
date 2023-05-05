import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/IUser';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient : HttpClient,
    private storage : StorageService) { }

  public loadByUsername(username : string) : Observable<IUser> {
    let token = this.storage.getToken()
    return this.httpClient.get<IUser>(`${environment.url}/api/v1/management/users/get/${username}`, {
      headers: {"Authorization": `Bearer ${token.access_token}`}
    });
  }
}
