import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly rootUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getAccount = () => {
    return this.http.get(`${this.rootUrl}/users/2`)
  }

  editAccount = (user:User) => {
    localStorage.setItem('account', JSON.stringify(user));
    const data = {saved: true}
    return data
  }
}
