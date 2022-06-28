import { User } from 'src/app/models/userModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://reqres.in/api/users';

  constructor(private httpClient: HttpClient) { }

  getUserData(page: number): Observable<UserResponse> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.httpClient.get<UserResponse>(url);
  }

  editUserData(user: User): Observable<Omit<User,'updatedAt'>> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.httpClient.patch<Omit<User,'updatedAt'>>(url,user);
  }

  createUserData(user: User): Observable<Omit<User,'createdAt'>> {
    const url = `${this.baseUrl}`;
    return this.httpClient.post<Omit<User,'createdAt'>>(url,user);
  }

  deleteUserData(user: User): Observable<Omit<User,'createdAt'>> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.httpClient.delete<Omit<User,'createdAt'>>(url);
  }
}
