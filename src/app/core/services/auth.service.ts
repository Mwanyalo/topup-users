import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly rootUrl = environment.api_url;
  constructor(private http: HttpClient) {}

  getToken = () => {
    return localStorage.getItem("sessionToken");  
  }

  login = (user: Auth) => {
    return this.http.post(this.rootUrl + '/login', user);
  };

  register = (user: Auth) => {
    return this.http.post(this.rootUrl + '/register', user);
  };

  logout = () => {
    localStorage.clear();
  }
}
