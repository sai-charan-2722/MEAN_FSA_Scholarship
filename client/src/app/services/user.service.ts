import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Application } from '.././models/application';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient)

  userLoginStatus = new BehaviorSubject<boolean>(false);

  getUserLoginStatus(): Observable<any> {
    return this.userLoginStatus.asObservable();
  }

  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value);
  }

  currentUser = new BehaviorSubject<User>({
    username: '',
    password: '',
    email: '',
    dob: ''
  });

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }

  createStudentUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser)
  }

  userStudentLogin(usercredobj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/login', usercredobj)
  }

  getUserByUsername(username: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/users?username=${username}`)
  }

  userLogout() {
    this.setUserLoginStatus(false);
    this.setCurrentUser({
      username: '',
      password: '',
      email: '',
      dob: ''
    });
    localStorage.removeItem('token')
  }
}
