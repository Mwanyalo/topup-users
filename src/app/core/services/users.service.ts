import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly rootUrl = environment.api_url;
  constructor(private http: HttpClient) {}

  getHomeUsers = (page: number) => {
    return this.http.get(`${this.rootUrl}/users?page=${page}`)
  }

  getAllUsers = () => {
      let users = localStorage.getItem('users');
      return users;
  }

  addDummy = (data: any[]) => {
    localStorage.setItem('users', JSON.stringify(data));
  }

  getUser = (id: number) => {
    return this.http.get(`${this.rootUrl}/users/${id}`)
  }

  editUser = (id: number, user: any) => {
    return this.http.put(`${this.rootUrl}/users/${id}`, user)
  }


  deleteUser = (id: number) => {
    return this.http.delete(`${this.rootUrl}/users/${id}`)
  }

}
