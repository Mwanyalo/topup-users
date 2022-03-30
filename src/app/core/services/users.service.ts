import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly rootUrl = environment.api_url;
  constructor(private http: HttpClient) {}

  getHomeUsers = (page: number) => {
    return this.http.get(`${this.rootUrl}/users?page=${page}`);
  };

  getAllUsers = () => {
    let users = localStorage.getItem('users');
    return users;
  };

  editDummy = (type: string, user: any) => {
    const data: any = this.getAllUsers();
    let oldUsers = JSON.parse(data);
    if (oldUsers === null) {
      oldUsers = [];
    }
    if (type === 'new') {
      oldUsers.push(user);
      localStorage.setItem('users', JSON.stringify(oldUsers));
    } else {
      const updatedOSArray = oldUsers.map((u: any) =>
        u.id === user.id ? { ...u, name: user.name, job: user.job } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedOSArray));
    }
  };

  getUser = (id: number) => {
    return this.http.get(`${this.rootUrl}/users/${id}`);
  };
  addUser = (user: any) => {
    return this.http.post(`${this.rootUrl}/users/}`, user);
  };
  editUser = (id: number, user: any) => {
    return this.http.put(`${this.rootUrl}/users/${id}`, user);
  };

  deleteUser = (id: string) => {
    return this.http.delete(`${this.rootUrl}/users/${id}`, {
      observe: 'response',
    });
  };

  deleteDummy = (id: string) => {
    const data: any = this.getAllUsers();
    let oldUsers = JSON.parse(data);
    const updatedOSArray = oldUsers.filter((u: any) => u.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedOSArray));
  };
}
